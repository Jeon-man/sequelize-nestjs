import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '@guard';

export function Auth() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
    ApiNotFoundResponse(),
    UseGuards(AuthGuard),
  );
}
