import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ImageGenerateParams } from 'openai/resources/images';

import { systemPrompt } from './ai.constants';

@Controller('/mystery')
export class AppController {
  readonly nanceGptAssistantId = 'asst_OPR7S8OrpHw70u7WvLNb3HAC';
  readonly completionOptions: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming = {
    messages: [],
    model: 'gpt-3.5-turbo-1106',
    n: 1,
    max_tokens: 500
  };

  openAi: OpenAI;
  constructor() {
    this.openAi = new OpenAI({
      apiKey: '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'
    });
  }

  @Post('/image')
  async generateImageFromPrompt(@Body() { prompt, size }: { prompt: string; size: ImageGenerateParams['size'] }) {
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
    console.log(`getting latest messages for thread: ${params.threadId} after: ${body?.after ?? '0'}`);
    const message = await this.openAi.beta.threads.messages.list(params.threadId, body?.after ? { after: body.after } : {});
    return this.convertMessagesResponse(message);
  }

  @Get(':threadId/messages')
  async listMessages(@Param() params: { threadId: string }) {
    console.log(`getting messages for thread: ${params.threadId}`);
    const message = await this.openAi.beta.threads.messages.list(params.threadId, {
      limit: 1
    });
    return this.convertMessagesResponse(message);
  }

  @Get(':threadId/runs')
  listRuns(@Param() params: { threadId: string }) {
    console.log(`getting runs for thread: ${params.threadId}`);
    return this.openAi.beta.threads.runs.list(params.threadId);
  }

  @Get(':threadId/:runId')
  async getRunStatus(@Param() params: { threadId: string; runId: string }) {
    console.log(`getting run status for thread: ${params.threadId} and run: ${params.runId}`);
    console.log(params);
    const run = await this.openAi.beta.threads.runs.retrieve(params.threadId, params.runId);
    return { status: run.status, threadId: run.thread_id, runId: run.id };
  }

  @Put(':threadId')
  async addMessageToThread(@Body() body: { message: string }, @Param() params: { threadId: string }) {
    console.log(`adding message to thread: ${params.threadId}`);
    const _addMessageRes = this.openAi.beta.threads.messages.create(params.threadId, {
      role: 'user',
      content: body.message
    });
    console.log('added message to thread successfully, now creating the run for it');
    try {
      const newRun = await this.openAi.beta.threads.runs.create(params.threadId, {
        assistant_id: this.nanceGptAssistantId
      });
      return this.getRunStatus({ threadId: params.threadId, runId: newRun.id });
    } catch (e) {
      console.log('error');
      console.log(e);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('')
  async createMystery(@Body() body: { prompt?: string }) {
    console.log(`creating a new mystery!`);
    const requestString = body.prompt ?? 'Lets solve a mystery';
    const run = await this.openAi.beta.threads.createAndRun({
      assistant_id: this.nanceGptAssistantId,
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
        console.error('Error parsing JSON string:', e);
      }
    }

    return value;
  }

  private convertMessagesResponse(message: OpenAI.Beta.Threads.Messages.ThreadMessagesPage) {
    return message.data.map((message) => {
      return {
        role: message.role,
        content: message.content.map((content) => {
          if (content.type === 'text') {
            return this.parseIfJsonString(content.text.value);
          } else {
            return content.image_file;
          }
        }),
        creationTime: message.created_at,
        id: message.id
      };
    });
  }

  @Post('/chatStart')
  chatStart(@Body() { prompt }: { prompt?: string }) {
    console.log(`Started a new chat with prompt: ${prompt}`);
    return this.startMystery(prompt);
  }

  @Post('/chatContinue')
  continueChat(@Body() { messages }: { messages: OpenAI.Chat.Completions.ChatCompletionMessage[] }) {
    console.log(`continued an old chat with: ${messages.slice(-1)[0].content}`);
    messages.forEach((message) => {
      if (typeof message.content === 'object') {
        message.content = JSON.stringify(message.content);
      }
    });
    return this.addNewUserMessageToChat(messages);
  }

  private async addNewUserMessageToChat(messages: OpenAI.Chat.Completions.ChatCompletionMessage[]) {
    const completion = await this.openAi.chat.completions.create({
      ...this.completionOptions,
      messages
    });
    return this.getNewMessage(completion);
  }

  private async startMystery(prompt?: string) {
    const messages: ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt ?? 'lets solve a mystery' }
    ];
    let completion: OpenAI.Chat.Completions.ChatCompletion;
    try {
      completion = await this.openAi.chat.completions.create({
        ...this.completionOptions,
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
      message.content = JSON.parse(message.content);
      return message;
    } catch (e) {
      throw new HttpException('JSON parsing of the GTP response failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
