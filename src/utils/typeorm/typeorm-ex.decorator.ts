import { SetMetadata } from '@nestjs/common';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

export const CustomRepository = (entity: object): ClassDecorator => {
    return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
};
