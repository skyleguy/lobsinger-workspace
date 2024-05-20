import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private readonly http = inject(HttpClient);

  getChat() {
    return this.http
      .post(
        'http://localhost:11434/api/generate',
        {
          model: 'llama3',
          prompt: 'Why is the sky blue?'
        },
        {
          observe: 'events',
          responseType: 'text',
          reportProgress: true
        }
      )
      .pipe(
        filter((res) => res.type === HttpEventType.DownloadProgress),
        map((res) => {
          console.log(res);
          const rows: string[] = (res as any)?.partialText?.split('\n').filter((row: string) => row.trim()?.length > 0);
          return rows.map((row) => {
            return JSON.parse(row)?.response;
          });
        }),
        map((responses: string[]) => {
          return responses.join(' ');
        })
      );
  }
}
