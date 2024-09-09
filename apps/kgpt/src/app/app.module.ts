import { Module } from '@nestjs/common';

import { createController } from '@lob/server/kgtp/chat';

import { mysteryChatStartSystemPrompt } from './mystery-chat-start';

@Module({
  imports: [],
  controllers: [
    createController('mystery', {
      apiKey: process.env['OPEN_AI_API_KEY'],
      completionOptions: {
        messages: [],
        model: 'gpt-4o',
        n: 1,
        max_tokens: 1000
      },
      isExpectingJsonInteractions: true,
      chatStartPrompt: mysteryChatStartSystemPrompt,
      assistantId: 'asst_OPR7S8OrpHw70u7WvLNb3HAC',
      defaultChatStartMessage: 'Lets solve a mystery'
    }),
    createController('angular', {
      apiKey: process.env['OPEN_AI_API_KEY'],
      completionOptions: {
        messages: [],
        model: 'gpt-4o',
        n: 1,
        max_tokens: 1000
      },
      isExpectingJsonInteractions: false,
      chatStartPrompt: 'You are an angular wizard and are helping tutor others in Angular',
      assistantId: 'asst_OPR7S8OrpHw70u7WvLNb3HAC',
      defaultChatStartMessage: 'How do i make a component'
    })
  ]
})
export class AppModule {}
