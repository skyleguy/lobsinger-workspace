import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, switchMap } from 'rxjs';

import { UserFacadeService } from '@lob/client/shared/auth/data-access';

@Component({
  selector: 'glist-header',
  templateUrl: './glist-header.component.html',
  styleUrls: ['./glist-header.component.scss']
})
export class GlistHeaderComponent implements OnInit {
  @Output()
  menuClicked: EventEmitter<void> = new EventEmitter();

  searchText = '';
  imageUrl$!: Observable<any>;

  constructor(private userFacadeService: UserFacadeService, private http: HttpClient, private sanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    this.getUserImage();
  }

  private getUserImage(): void {
    this.imageUrl$ = this.userFacadeService.user$.pipe(
      switchMap((res) =>
        this.http.get(res.pictureUrl ?? '', { responseType: 'arraybuffer' }).pipe(
          map((res) => {
            const image = btoa(
              Array.from(new Uint8Array(res))
                .map((b) => String.fromCharCode(b))
                .join('')
            );
            return this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${image}`);
          })
        )
      )
    );
  }
}
