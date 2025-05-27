import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';
import { LLMController } from './llm.controller';
import { LLMCore } from './llm.core';

@Module({
    controllers: [LLMController],
    providers: [LLMService, LLMCore],
    exports: [LLMService], // ¡esto es clave para usarlo fuera del módulo!
})
export class LLMModule {}