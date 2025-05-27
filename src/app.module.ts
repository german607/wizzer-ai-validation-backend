import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LLMController } from './ia/llm.controller';
import { LLMService } from './ia/llm.service';
import { LLMCore } from './ia/llm.core';
import { LLMModule } from './ia/llm.module';

@Module({
  imports: [LLMModule],
  controllers: [AppController, LLMController],
  providers: [AppService, LLMService, LLMCore],
})
export class AppModule {}
