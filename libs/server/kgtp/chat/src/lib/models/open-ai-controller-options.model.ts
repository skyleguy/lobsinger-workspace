import OpenAI from 'openai';

export interface OpenAiControllerOptions {
  apiKey: string;
  assistantId: string;
  completionOptions: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;
  isExpectingJsonInteractions: boolean;
  chatStartPrompt?: string;
  defaultChatStartMessage?: string;
  route?: string;
}
