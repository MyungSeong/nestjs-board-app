import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';

import { BoardsModule } from './boards/boards.module';
import { TypeOrmConfigAsync } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'production'
                    ? ['.env.production.local', '.env.production']
                    : process.env.NODE_ENV === 'development'
                    ? ['.env.development.local', '.env.development']
                    : ['.env.test.local', '.env.test'],
            // ignoreEnvFile: process.env.NODE_ENV === 'production',
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'test')
                    .required(),
                DB_HOST: Joi.string().required(),
                DB_PORT: Joi.string().required(),
                DB_USERNAME: Joi.string().required(),
                DB_PASSWORD: Joi.string().required(),
                DB_NAME: Joi.string().required(),
            }),
        }),
        TypeOrmModule.forRootAsync(TypeOrmConfigAsync),
        BoardsModule,
        AuthModule,
    ],
})
export class AppModule {}
