import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SnippetModule } from './snippet/snippet.module';
import { userProviders } from './user/user.providers';
import { GithubOauthController } from './auth/github.controller';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';
import { GithubStrategy } from './auth/github.strategy';
import { JwtAuthModule } from './auth/jwt-auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    ConfigModule.forRoot(),
    //DatabaseModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONO_DB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TagModule,
    SnippetModule,
    JwtAuthModule,
    // AuthModule,
  ],
  controllers: [AppController, GithubOauthController],
  providers: [
    AppService,
    GithubStrategy,
    //UserService,
    //UserResolver,
  ],
})
export class AppModule {}
