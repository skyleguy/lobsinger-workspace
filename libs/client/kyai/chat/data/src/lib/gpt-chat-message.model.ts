export interface GptChatMessage<T> {
  role: 'user' | 'system' | 'assistant';
  content: string | T;
}
