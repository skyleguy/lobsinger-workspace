import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { GptChatMessage, ContentWrapper, Conversation, ConversationType } from '@lob/client/kyai/chat/data';

@Injectable({
  providedIn: 'any'
})
export class GptService<MessageContent> {
  readonly baseurl = `http://localhost:3000/api/`;

  constructor(
    private http: HttpClient,
    @Inject(ConversationType) readonly conversation: Conversation
  ) {
    this.baseurl += conversation;
  }

  public generateImage(prompt: string, size: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792') {
    return this.http.post<{ url: string }[]>(`${this.baseurl}/image`, { prompt, ...(size ? { size } : {}) });
  }

  /**
   * Start a new thread with a run using the Beta Assistants API
   * @param prompt
   * @returns
   */
  public startConversation(prompt?: string) {
    return this.http.put<{ status: string; threadId: string; runId: string }>(this.baseurl, { ...(prompt ? { prompt } : {}) });
  }

  public listLatestContentForThread(threadId: string) {
    return this.http.post<ContentWrapper<MessageContent>[]>(`${this.baseurl}/${threadId}/content`, {});
  }

  /**
   * Add to a new message and run to an existing thread using the Beta Assistants Api
   * @param threadId
   * @param message
   * @returns
   */
  public addMessageToThread(threadId: string, message: string) {
    return this.http.put<{ status: string; threadId: string; runId: string }>(`${this.baseurl}/${threadId}`, { message });
  }

  public checkRunStatus(threadId: string, runId: string) {
    return this.http.get<{ status: string; threadId: string; runId: string }>(`${this.baseurl}/${threadId}/${runId}`);
  }

  public getMessagesForThread(threadId: string) {
    return this.http.get<ContentWrapper<MessageContent>[]>(`${this.baseurl}/${threadId}/messages`);
  }

  public getRunsforThread(threadId: string) {
    return this.http.get<{ data: { id: string; status: string }[] }>(`${this.baseurl}/${threadId}/runs`);
  }

  /**
   * Start conversation using the chat completions API
   * @param prompt
   */
  public startChat(prompt?: string) {
    return this.http.post<GptChatMessage<MessageContent>[]>(`${this.baseurl}/chatStart`, { ...(prompt ? { prompt } : {}) });
  }

  /**
   * Continue conversation using the chat completions API
   * @param prompt
   */
  public continueChat(messages: GptChatMessage<MessageContent>[]) {
    return this.http.post<GptChatMessage<MessageContent>>(`${this.baseurl}/chatContinue`, { messages });
  }

  public streamSpeechFromText(text: string) {
    return this.http.post<{ url: string }>(`${this.baseurl}/submitSpeech`, { text }).pipe(map((res) => res.url));
  }
}
