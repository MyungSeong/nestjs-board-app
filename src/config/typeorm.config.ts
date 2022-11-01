import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

export class TypeOrmConfig {
    static getTypeOrmConfig(
        configService: ConfigService,
    ): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: configService.get<string>('DB_HOST') || 'localhost',
            port: +configService.get<number>('DB_PORT') || 3306,
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_NAME'),
            entities: [
                __dirname + '/../**/*.entity.{js,ts}',
                __dirname + '/../**/!(*.test).{js,ts}',
            ],
            synchronize: process.env.NODE_ENV === 'development',
            logging:
                configService.get<LoggerOptions>('TYPEORM_LOGGING') || false,
            // autoLoadEntities: true,
        };
    }
}

export const TypeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> =>
        TypeOrmConfig.getTypeOrmConfig(configService),
    inject: [ConfigService],
};
