import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { IS_PRIVATE } from '../../modules/auth/auth.constants';

export const Auth = (): CustomDecorator => SetMetadata(IS_PRIVATE, true);
