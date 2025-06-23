import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  public toast(severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast', title: string, message: string): void {
    this.messageService.add({
      life: 3000,
      severity,
      summary: title,
      detail: message
    });
  }
}
