import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

import { GameContainerComponent } from './components/game-container.component';
import { SidebarComponent } from './components/sidebar.component';
import { TextContainerComponent } from './components/text-container.component';
import { TopMenuComponent } from './components/top-menu.component';
import { GptChatMessage, MysteryDetails, Suggestion } from './models/mystery.model';
import { GptService } from './services/gpt.service';

@Component({
  selector: 'app-main-container',
  standalone: true,
  imports: [CommonModule, TopMenuComponent, TextContainerComponent, GameContainerComponent, SidebarComponent],
  templateUrl: 'main-container.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  // threadId!: string;
  mysteryDetails!: MysteryDetails | null;
  // responses: Response[] = [];
  // userRequests: string[] = [];
  accumulatingMessages: GptChatMessage[] = [];
  shownMessages: string[] = [];
  mysteryCoverPhoto!: string;
  suggestions: Suggestion[] = [];

  constructor(
    private readonly gptService: GptService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  public requestMysteryStart(prompt: string) {
    this.shownMessages.push(prompt?.trim() ?? 'Lets solve a mystery');
    this.gptService.startMysteryChat(prompt).subscribe({
      next: (starterMessages) => {
        this.accumulatingMessages = this.accumulatingMessages.concat(starterMessages);
        const firstAssistantResponse = starterMessages.find((message) => message.role === 'assistant');
        if (firstAssistantResponse) {
          const { content } = firstAssistantResponse;
          if (typeof content !== 'string') {
            if (content.mysteryDetails) {
              this.mysteryDetails = content.mysteryDetails;
              this.shownMessages = this.shownMessages.concat(this.mysteryDetails.description);
              this.getImagesForItems();
            }
            if (content.response) {
              this.shownMessages = this.shownMessages.concat(content.response.details);
              this.suggestions = content.response.suggestions;
            }
          }
        }
        this.cdRef.detectChanges();
      }
    });
  }

  public addUserPrompt(message: string) {
    this.suggestions = [];
    this.shownMessages.push(message);
    this.accumulatingMessages.push({ role: 'user', content: message });
    this.gptService.continueMysteryChat(this.accumulatingMessages).subscribe({
      next: (newMessage) => {
        if (typeof newMessage.content !== 'string') {
          this.shownMessages.push(newMessage.content.response.details);
          this.suggestions = newMessage.content.response.suggestions;
          this.cdRef.detectChanges();
        }
      }
    });
  }

  // public requestMysteryStart(prompt: string) {
  //   this.userRequests.push(prompt);
  //   this.gptService
  //     .startMysteryConversation(prompt)
  //     .pipe(
  //       tap((res) => {
  //         this.threadId = res.threadId;
  //       }),
  //       switchMap((res) =>
  //         this.gptService.checkRunStatus(res.threadId, res.runId).pipe(
  //           repeat({ delay: 1000 }),
  //           filter((res) => res.status === 'completed'),
  //           take(1)
  //         )
  //       ),
  //       switchMap((res) => {
  //         return this.gptService.getMessagesForThread(res.threadId);
  //       })
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         const [latestMessage] = res;
  //         if (latestMessage.content?.[0]?.mysteryDetails) {
  //           this.mysteryDetails = latestMessage.content?.[0]?.mysteryDetails;
  //           this.responses.push({ details: latestMessage.content?.[0]?.mysteryDetails?.description, suggestions: [] });
  //           this.getImagesForItems();
  //         }
  //         if (latestMessage.role === 'assistant' && latestMessage.content?.[0]?.response) {
  //           this.responses.push(latestMessage.content?.[0].response);
  //         }
  //         this.cdRef.detectChanges();
  //       }
  //     });
  // }

  // public addUserPrompt(userPrompt: string) {
  //   this.userRequests.push(userPrompt);
  //   this.gptService
  //     .addMessageToThread(this.threadId, userPrompt)
  //     .pipe(
  //       switchMap((res) =>
  //         this.gptService.checkRunStatus(res.threadId, res.runId).pipe(
  //           repeat({ delay: 1000 }),
  //           filter((res) => res.status === 'completed'),
  //           take(1)
  //         )
  //       ),
  //       switchMap((res) => {
  //         return this.gptService.getMessagesForThread(res.threadId);
  //       })
  //     )
  //     .subscribe({
  //       next: (res) => {
  //         const [latestMessage] = res;
  //         if (latestMessage.role === 'assistant' && latestMessage.content?.[0]?.response) {
  //           this.responses.push(latestMessage.content?.[0].response);
  //         }
  //         this.cdRef.detectChanges();
  //       }
  //     });
  // }

  public endMystery(): void {
    this.mysteryDetails = null;
    this.shownMessages = [];
    this.accumulatingMessages = [];
    this.suggestions = [];
  }

  private getImagesForItems(): void {
    this.generateCharacterImages();
    this.generateMysteryCoverPhoto();
  }

  private generateCharacterImages() {
    this.mysteryDetails?.characters?.forEach((character, index) => {
      this.gptService
        .generateImage(
          `generate a unique and interesting character image from the following character description. they should be looking at the camera and have an air of mystery or suspicion about them. The style of the image should be photo realism. the background of the image should feature the location this character may be in often or work in. they should be wearing/holding things that match their description: ${character.description}`,
          '1024x1024'
        )
        .subscribe({
          next: (res) => {
            if (this.mysteryDetails) {
              this.mysteryDetails.characters[index] = { ...this.mysteryDetails?.characters[index], imageUrl: res?.[0]?.url };
              this.mysteryDetails.characters = [...this.mysteryDetails.characters];
              this.cdRef.detectChanges();
            }
          }
        });
    });
  }

  private generateMysteryCoverPhoto() {
    this.gptService
      .generateImage(
        `generate a realistic, unique, and interesting movie poster for an intriguing, exciting, and engaging mystery movie with the following plot. the image should not contain any text. the image should focus on the mystery itself and the location the mystery takes place in: ${this.mysteryDetails?.description}`,
        '1024x1024'
      )
      .subscribe({
        next: (res) => {
          this.mysteryCoverPhoto = res?.[0]?.url;
          this.cdRef.detectChanges();
        }
      });
  }
}
