import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

import { GptChatMessage } from '@lob/client/kyai/chat/data';
import { GptService } from '@lob/client/kyai/chat/data-access';
import {
  MysteryDetails,
  Suggestion,
  offlineContent,
  offlineMysteryCoverPhotoUrl,
  offlineShownMessages,
  MysteryContent
} from '@lob/client/kyai/layout/data';
import { TopMenuComponent, TextContainerComponent, GameContainerComponent, SidebarComponent } from '@lob/client/kyai/layout/ui';

@Component({
  selector: 'kyai-layout-feature-main-container',
  standalone: true,
  imports: [CommonModule, TopMenuComponent, TextContainerComponent, GameContainerComponent, SidebarComponent],
  templateUrl: 'main-container.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContainerComponent {
  readonly isOfflineMode = true;

  mysteryDetails!: MysteryDetails | null;
  accumulatingMessages: GptChatMessage<MysteryContent>[] = [];
  shownMessages: string[] = [];
  suggestions: Suggestion[] = [];
  mysteryCoverPhoto!: string;

  constructor(
    private readonly gptService: GptService,
    private readonly cdRef: ChangeDetectorRef
  ) {
    if (this.isOfflineMode) {
      this.mysteryDetails = offlineContent.mysteryDetails;
      this.suggestions = offlineContent.response.suggestions;
      this.shownMessages = offlineShownMessages;
      this.mysteryCoverPhoto = offlineMysteryCoverPhotoUrl;
    }
  }

  public requestMysteryStart(prompt: string) {
    this.shownMessages = [...this.shownMessages, prompt?.trim() ?? 'Lets solve a mystery'];
    this.gptService.startChat<MysteryContent>(prompt).subscribe({
      next: (starterMessages) => {
        this.accumulatingMessages = this.accumulatingMessages.concat(starterMessages);
        const firstAssistantResponse = starterMessages.find((message) => message.role === 'assistant');
        if (firstAssistantResponse) {
          const { content } = firstAssistantResponse;
          if (typeof content !== 'string') {
            if (content.mysteryDetails) {
              this.mysteryDetails = content.mysteryDetails;
              if (this.mysteryDetails?.description) {
                this.shownMessages = [...this.shownMessages, this.mysteryDetails.description];
              }
              this.getImagesForItems();
            }
            if (content.response) {
              this.shownMessages = [...this.shownMessages, content.response.details];
              this.suggestions = content.response.suggestions;
            }
          }
        }
        this.cdRef.detectChanges();
      }
    });
  }

  public addUserPrompt(message: string) {
    if (this.isOfflineMode) {
      this.shownMessages = [...this.shownMessages, message];
    } else {
      this.suggestions = [];
      this.shownMessages = [...this.shownMessages, message];
      this.accumulatingMessages.push({ role: 'user', content: message });
      this.gptService.continueChat<MysteryContent>(this.accumulatingMessages).subscribe({
        next: (newMessage) => {
          if (typeof newMessage.content !== 'string') {
            this.shownMessages = [...this.shownMessages, newMessage.content.response.details];
            this.suggestions = newMessage.content.response.suggestions;
            this.cdRef.detectChanges();
          }
        }
      });
    }
  }

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
