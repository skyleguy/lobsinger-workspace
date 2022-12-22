import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

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

  constructor(private userFacadeService: UserFacadeService, private http: HttpClient) {}

  public ngOnInit(): void {
    this.getUserImage();
  }

  private getUserImage(): void {
    this.imageUrl$ = this.userFacadeService.user$.pipe(switchMap((res) => this.http.get(res.pictureUrl ?? '', { withCredentials: true })));
  }
}
