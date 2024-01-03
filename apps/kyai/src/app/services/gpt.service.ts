import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ContentWrapper } from '../models/mystery.model';

@Injectable({
  providedIn: 'root'
})
export class GptService {
  readonly baseurl = 'http://localhost:3000/api/mystery';
  constructor(private http: HttpClient) {}

  public generateImage(prompt: string, size: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792') {
    return this.http.post<{ url: string }[]>(`${this.baseurl}/image`, { prompt, ...(size ? { size } : {}) });
  }

  public startMysteryConversation(prompt?: string) {
    return this.http.put<{ status: string; threadId: string; runId: string }>(this.baseurl, { ...(prompt ? { prompt } : {}) });
  }

  public listLatestContentForThread(threadId: string) {
    return this.http.post<ContentWrapper[]>(`${this.baseurl}/${threadId}/content`, {});
  }

  public addMessageToThread(threadId: string, message: string) {
    return this.http.put<{ status: string; threadId: string; runId: string }>(`${this.baseurl}/${threadId}`, { message });
  }

  public checkRunStatus(threadId: string, runId: string) {
    return this.http.get<{ status: string; threadId: string; runId: string }>(`${this.baseurl}/${threadId}/${runId}`);
  }

  public getMessagesForThread(threadId: string) {
    return this.http.get<{ data: { role: string; id: string; content: { text: { value: unknown } }[] }[] }>(
      `${this.baseurl}/${threadId}/messages`
    );
  }

  public getRunsforThread(threadId: string) {
    return this.http.get<{ data: { id: string; status: string }[] }>(`${this.baseurl}/${threadId}/runs`);
  }
}
