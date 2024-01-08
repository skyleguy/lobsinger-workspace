import { Controller } from '@nestjs/common';

import { OpenAiBaseController } from '../controllers/open-ai.controller';
import { OpenAiControllerOptions } from '../models/open-ai-controller-options.model';

export function createController(route: string, options: OpenAiControllerOptions) {
  @Controller(route)
  class CustomController extends OpenAiBaseController {
    constructor() {
      super({ ...options, route });
    }
  }
  return CustomController;
}
