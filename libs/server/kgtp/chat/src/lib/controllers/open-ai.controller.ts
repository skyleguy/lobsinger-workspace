import { Body, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ImageGenerateParams } from 'openai/resources/images';
import { v4 as uuidv4 } from 'uuid';

import { Readable } from 'stream';

import { OpenAiControllerOptions } from '../models/open-ai-controller-options.model';

export class OpenAiBaseController {
  readonly #jsonStringReplace = /json|```|\n/g;
  readonly #logger = new Logger(OpenAiBaseController.name);
  readonly idMap: Record<string, string> = {};

  openAi: OpenAI;

  constructor(private readonly controllerOptions: OpenAiControllerOptions) {
    this.openAi = new OpenAI({
      apiKey: controllerOptions.apiKey
    });
  }

  @Post('/submitSpeech')
  async generateSpeechRequestFromText(@Body() { text }: { text: string }) {
    const uuid = uuidv4();
    this.idMap[uuid] = text;
    this.#logger.log(this.idMap);
    return { url: `http://localhost:3000/api/mystery/speech/${uuid}` };
  }

  @Get('/speech/:textId')
  async generateSpeechFromText(@Param('textId') textId: string, @Res() res: Response) {
    res.setHeader('Content-Type', 'media/opus');
    const response = await this.openAi.audio.speech.create({
      model: 'tts-1',
      voice: 'shimmer',
      input: this.idMap[textId],
      response_format: 'opus'
    });
    delete this.idMap[textId];
    this.#logger.log(this.idMap);
    const readableStream = response.body as unknown as Readable;
    readableStream.pipe(res);
  }

  @Post('/image')
  async generateImageFromPrompt(@Body() { prompt, size }: { prompt: string; size: ImageGenerateParams['size'] }) {
    this.#logger.log(`${this.controllerOptions.route}: generating image`);
    const image = await this.openAi.images.generate({
      prompt,
      n: 1,
      model: 'dall-e-3',
      quality: 'standard',
      response_format: 'url',
      style: 'vivid',
      size: size ?? '1024x1024'
    });
    return image.data;
  }

  @Post(':threadId/content')
  async getLatestAssistantMessages(@Param() params: { threadId: string }, @Body() body: { after?: string }) {
    this.#logger.log(
      `${this.controllerOptions.route}: getting latest messages for thread: ${params.threadId} after: ${body?.after ?? '0'}`
    );
    const message = await this.openAi.beta.threads.messages.list(params.threadId, body?.after ? { after: body.after } : {});
    return this.convertMessagesResponse(message);
  }

  @Get(':threadId/messages')
  async listMessages(@Param() params: { threadId: string }) {
    this.#logger.log(`${this.controllerOptions.route}: getting messages for thread: ${params.threadId}`);
    const message = await this.openAi.beta.threads.messages.list(params.threadId, {
      limit: 1
    });
    return this.convertMessagesResponse(message);
  }

  @Get(':threadId/runs')
  listRuns(@Param() params: { threadId: string }) {
    this.#logger.log(`${this.controllerOptions.route}: getting runs for thread: ${params.threadId}`);
    return this.openAi.beta.threads.runs.list(params.threadId);
  }

  @Get(':threadId/:runId')
  async getRunStatus(@Param() params: { threadId: string; runId: string }) {
    this.#logger.log(`${this.controllerOptions.route}: getting run status for thread: ${params.threadId} and run: ${params.runId}`);
    const run = await this.openAi.beta.threads.runs.retrieve(params.threadId, params.runId);
    return { status: run.status, threadId: run.thread_id, runId: run.id };
  }

  @Put(':threadId')
  async addMessageToThread(@Body() body: { message: string }, @Param() params: { threadId: string }) {
    this.#logger.log(`${this.controllerOptions.route}: adding message to thread: ${params.threadId}`);
    const _addMessageRes = this.openAi.beta.threads.messages.create(params.threadId, {
      role: 'user',
      content: body.message
    });
    this.#logger.log(`${this.controllerOptions.route}: added message to thread successfully, now creating the run for it`);
    try {
      const newRun = await this.openAi.beta.threads.runs.create(params.threadId, {
        assistant_id: this.controllerOptions.assistantId
      });
      return this.getRunStatus({ threadId: params.threadId, runId: newRun.id });
    } catch (e) {
      console.log('error');
      console.log(e);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('')
  async createChat(@Body() body: { prompt?: string }) {
    this.#logger.log(`${this.controllerOptions.route}: creating a new chat!`);
    const requestString = body.prompt ?? 'Lets solve a mystery';
    const run = await this.openAi.beta.threads.createAndRun({
      assistant_id: this.controllerOptions.assistantId,
      thread: {
        messages: [{ role: 'user', content: requestString }]
      }
    });

    return this.getRunStatus({ threadId: run.thread_id, runId: run.id });
  }

  private parseIfJsonString(value: string): unknown {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch (e) {
        this.#logger.error('Error parsing JSON string:', e);
      }
    }

    return value;
  }

  private convertMessagesResponse(message: OpenAI.Beta.Threads.Messages.MessagesPage) {
    return message.data.map((message) => {
      return {
        role: message.role,
        content: message.content.map((content) => {
          if (content.type === 'text') {
            if (this.controllerOptions.isExpectingJsonInteractions) {
              return this.parseIfJsonString(content.text.value);
            } else {
              return content.text.value;
            }
          } else if (content.type === 'image_file') {
            return content.image_file;
          } else {
            return content.image_url;
          }
        }),
        creationTime: message.created_at,
        id: message.id
      };
    });
  }

  /**
   * endpoint used to test streaming a response
   */
  @Post('/chatStream')
  async chatStream(@Body() { message }: { message: string }, @Res() res: Response) {
    const readable = new Readable({
      objectMode: true,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      read() {}
    });
    readable.pipe(res);
    const completion = await this.openAi.chat.completions.create({
      ...this.controllerOptions.completionOptions,
      messages: [{ role: 'user', content: message }],
      stream: true
    });
    for await (const chunk of completion) {
      const data = chunk?.choices[0]?.delta?.content;
      if (data) {
        readable.push(data);
      }
    }
    readable.push(null);
  }

  /**
   * endpoint used for the chat completions api in order to start a chat
   * @param param
   * @returns
   */
  @Post('/chatStart')
  chatStart(@Body() { prompt }: { prompt?: string }) {
    console.log(`${this.controllerOptions.route}: Started a new chat with prompt: ${prompt}`);
    return this.startChat(prompt);
  }

  /**
   * endpoint used for the chat completions api in order to continue a chat
   * @param param
   * @returns
   */
  @Post('/chatContinue')
  continueChat(@Body() { messages }: { messages: OpenAI.Chat.Completions.ChatCompletionMessage[] }) {
    console.log(`${this.controllerOptions.route}: continued an old chat with: ${messages.slice(-1)[0].content}`);
    messages.forEach((message) => {
      if (typeof message.content === 'object' && this.controllerOptions.isExpectingJsonInteractions) {
        message.content = JSON.stringify(message.content);
      }
    });
    return this.addNewUserMessageToChat(messages);
  }

  private async addNewUserMessageToChat(messages: OpenAI.Chat.Completions.ChatCompletionMessage[]) {
    const completion = await this.openAi.chat.completions.create({
      ...this.controllerOptions.completionOptions,
      messages
    });
    return this.getNewMessage(completion);
  }

  private async startChat(prompt?: string) {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: this.controllerOptions.chatStartPrompt ?? '' },
      { role: 'user', content: prompt ?? this.controllerOptions.defaultChatStartMessage ?? '' }
    ];
    let completion: OpenAI.Chat.Completions.ChatCompletion;
    try {
      completion = await this.openAi.chat.completions.create({
        ...this.controllerOptions.completionOptions,
        messages
      });
    } catch (e) {
      throw new HttpException({ message: 'Failed to get successful completion response', cause: e }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const newResponse = this.getNewMessage(completion);
    const starterOutput = [...messages, newResponse];
    return starterOutput;
  }

  private getNewMessage(completion: OpenAI.Chat.Completions.ChatCompletion) {
    const { message } = completion.choices[0];
    try {
      if (message.content && this.controllerOptions.isExpectingJsonInteractions) {
        const fixedContent = message?.content?.replace(this.#jsonStringReplace, '');
        message.content = JSON.parse(fixedContent);
      }
      return message;
    } catch (e) {
      this.#logger.error(`Got JSON parsing error during the parsing of the GPT Response`);
      throw new HttpException('JSON parsing of the GPT response failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
