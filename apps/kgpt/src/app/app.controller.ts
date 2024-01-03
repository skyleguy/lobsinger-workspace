import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import OpenAI from 'openai';
import { ImageGenerateParams } from 'openai/resources/images';

@Controller('/mystery')
export class AppController {
  readonly nanceGptAssistantId = 'asst_OPR7S8OrpHw70u7WvLNb3HAC';

  openAi: OpenAI;
  constructor() {
    this.openAi = new OpenAI({
      apiKey: 'YOUR_KEY'
    });
  }

  @Post(':threadId/content')
  async getLatestAssistantMessages(@Param() params: { threadId: string }, @Body() body: { after?: string }) {
    console.log(`getting latest messages for thread: ${params.threadId} after: ${body?.after ?? '0'}`);
    const res = await this.openAi.beta.threads.messages.list(params.threadId, body?.after ? { after: body.after } : {});
    return res.data.map((message) => {
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

  @Get(':threadId/messages')
  listMessages(@Param() params: { threadId: string }) {
    console.log(`getting messages for thread: ${params.threadId}`);
    return this.openAi.beta.threads.messages.list(params.threadId);
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

  @Put(':threadId')
  async addMessageToThread(@Body() body: { message: string }, @Param() params: { threadId: string }) {
    console.log(`adding message to thread: ${params.threadId}`);
    const _addMessageRes = this.openAi.beta.threads.messages.create(params.threadId, {
      role: 'user',
      content: body.message
    });
    const newRun = await this.openAi.beta.threads.runs.create(params.threadId, {
      assistant_id: this.nanceGptAssistantId
    });
    return this.getRunStatus({ threadId: params.threadId, runId: newRun.id });
  }

  @Put('')
  async createMystery(@Body() body: { prompt?: string }) {
    console.log(`creating a new mystery!`);
    const requestString = body.prompt ?? '{ "request": "Lets solve a mystery"}';
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
}
