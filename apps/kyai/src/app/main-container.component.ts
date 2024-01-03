import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';

import { GameContainerComponent } from './components/game-container.component';
import { SidebarComponent } from './components/sidebar.component';
import { TextContainerComponent } from './components/text-container.component';
import { TopMenuComponent } from './components/top-menu.component';
import { MysteryDetails, Response } from './models/mystery.model';
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
  threadId!: string;
  interval!: ReturnType<typeof setInterval>;
  mysteryDetails!: MysteryDetails | null;
  responses: Response[] = [];
  mysteryCoverPhoto!: string;

  constructor(
    private readonly gptService: GptService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  public requestMysteryStart(prompt: string) {
    this.gptService.startMysteryConversation(prompt).subscribe({
      next: (res) => {
        this.threadId = res.threadId;
        this.interval = setInterval(() => this.pollForMessages(), 5000);
      }
    });
  }

  private pollForMessages() {
    this.gptService.listLatestContentForThread(this.threadId).subscribe({
      next: (res) => {
        res.forEach((contentWrapper) => {
          if (contentWrapper.content?.[0]?.mysteryDetails) {
            this.mysteryDetails = contentWrapper.content?.[0]?.mysteryDetails;
            this.responses.push({ details: contentWrapper.content?.[0]?.mysteryDetails?.description, suggestions: [] });
            clearInterval(this.interval);
            this.getImagesForItems();
          }
          if (contentWrapper.role === 'assistant' && contentWrapper.content?.[0]?.response) {
            this.responses.push(contentWrapper.content?.[0].response);
          }
        });
        this.cdRef.detectChanges();
      }
    });
  }

  public endMystery(): void {
    this.mysteryDetails = null;
    this.responses = [];
    clearInterval(this.interval);
  }

  private getImagesForItems(): void {
    this.mysteryDetails?.characters?.forEach((character, index) => {
      this.gptService.generateImage(`${character.description}`, '1024x1024').subscribe({
        next: (res) => {
          if (this.mysteryDetails) {
            this.mysteryDetails.characters[index] = { ...this.mysteryDetails?.characters[index], imageUrl: res?.[0]?.url };
            this.mysteryDetails.characters = [...this.mysteryDetails.characters];
            this.cdRef.detectChanges();
          }
        }
      });
    });

    this.gptService
      .generateImage(
        `generate a cover photo as if for a movie poster or book cover from this prompt: ${this.mysteryDetails?.description}`,
        '1024x1024'
      )
      .subscribe({
        next: (res) => {
          this.mysteryCoverPhoto = res?.[0]?.url;
          this.cdRef.detectChanges();
        }
      });

    // this.mysteryDetails?.locations?.forEach((location, index) => {
    //   this.gptService
    //     .generateImage(`generate a unique and interesting photo of a location with this descrpition: ${location.description}`, '1024x1024')
    //     .subscribe({
    //       next: (res) => {
    //         if (this.mysteryDetails) {
    //           this.mysteryDetails.locations[index] = { ...this.mysteryDetails?.locations[index], imageUrl: res?.[0]?.url };
    //         }
    //       }
    //     });
    // });
  }
}
