import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { MongooseModule } from '@nestjs/mongoose';
//import { SnippetService } from './snippet.service';
import { SnippetEntity, SnippetEntitySchema } from './snippet.schema';
import { Snippet } from './dto/snippet.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {document: SnippetEntity, name: SnippetEntity.name, schema: SnippetEntitySchema}
        ])
      ],
      resolvers: [{DTOClass: Snippet, EntityClass: SnippetEntity}]
    })
  ],
})
export class SnippetModule {}
