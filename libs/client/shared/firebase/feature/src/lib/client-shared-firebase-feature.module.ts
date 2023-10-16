import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientSharedFirebaseDataAccessModule } from '@lob/client/shared/firebase/data-access';

@NgModule({
  imports: [CommonModule, ClientSharedFirebaseDataAccessModule.forRoot()]
})
export class ClientSharedFirebaseFeatureModule {}
