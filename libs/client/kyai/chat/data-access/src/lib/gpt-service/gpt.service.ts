import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { GptChatMessage, ContentWrapper } from '@lob/client/kyai/chat/data';

@Injectable({
  providedIn: 'root'
})
export class GptService {
  readonly baseurl = 'http://localhost:3000/api/mystery';
  constructor(private http: HttpClient) {}

  public generateImage(prompt: string, size: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792') {
    return this.http.post<{ url: string }[]>(`${this.baseurl}/image`, { prompt, ...(size ? { size } : {}) });
  }

  /**
   * Start a new thread with a run using the Beta Assistants API
   * @param prompt
   * @returns
   */
  public startMysteryConversation(prompt?: string) {
    return this.http.put<{ status: string; threadId: string; runId: string }>(this.baseurl, { ...(prompt ? { prompt } : {}) });
  }

  public listLatestContentForThread<T>(threadId: string) {
    return this.http.post<ContentWrapper<T>[]>(`${this.baseurl}/${threadId}/content`, {});
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

  public getMessagesForThread<T>(threadId: string) {
    return this.http.get<ContentWrapper<T>[]>(`${this.baseurl}/${threadId}/messages`);
  }

  public getRunsforThread(threadId: string) {
    return this.http.get<{ data: { id: string; status: string }[] }>(`${this.baseurl}/${threadId}/runs`);
  }

  /**
   * Start mystery using the chat completions API
   * @param prompt
   */
  public startChat<T>(prompt?: string) {
    return this.http.post<GptChatMessage<T>[]>(`${this.baseurl}/chatStart`, { ...(prompt ? { prompt } : {}) });
  }

  /**
   * Continue mystery using the chat completions API
   * @param prompt
   */
  public continueChat<T>(messages: GptChatMessage<T>[]) {
    return this.http.post<GptChatMessage<T>>(`${this.baseurl}/chatContinue`, { messages });
  }
}
