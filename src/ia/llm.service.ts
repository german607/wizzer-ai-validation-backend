import { Controller, Injectable, Post } from '@nestjs/common';
import { LLMCore } from './llm.core';

@Injectable()
export class LLMService {

    constructor(private readonly llm: LLMCore) {
    }

    async generateResponse(): Promise<string> {
        const response = await this.llm.run();
        return response;
    }

    async analyzeImage(imageUrl: string): Promise<string> {
        const response = await this.llm.analyzeImage(imageUrl);
        return response;
    }
}