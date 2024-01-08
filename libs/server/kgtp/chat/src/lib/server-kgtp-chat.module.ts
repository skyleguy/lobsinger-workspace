import { Module } from '@nestjs/common';

import { createController } from './util/create-controller';

@Module({
  controllers: [createController('mystery', {})],
  providers: [],
  exports: []
})
export class ServerKgtpChatModule {}
