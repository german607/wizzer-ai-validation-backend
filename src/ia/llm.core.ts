import { Injectable } from '@nestjs/common';
import { AzureChatOpenAI } from '@langchain/openai';
import { ANALYZE_IMAGE_PROMPT } from './llm.prompts';

import axios from 'axios';
import { Buffer } from 'buffer';

import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class LLMCore {


    private llm: AzureChatOpenAI;
        
    constructor() {

            this.llm = new AzureChatOpenAI({
              model: 'gpt-4o-mini',
              temperature: 0,
              azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
              azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_INSTANCE_NAME,
              azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
              azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION 
          });
        }
        
        async getBase64ImageFromUrl(url: string): Promise<string> {
          const response = await axios.get(url, {
            responseType: 'arraybuffer',
          });
          const buffer = Buffer.from(response.data, 'binary');
          return buffer.toString('base64');
        }

    async run(): Promise<string> {

        const response = await this.llm.invoke('tell me a joke');
        return response.text;
    }

    async analyzeImage(url: string): Promise<string> {

        const response = await this.llm.invoke([
            {
              role: 'user',
              content: [
                { type: 'text', text: ANALYZE_IMAGE_PROMPT },
                {
                  type: 'image_url',
                  image_url: {
                    url, // tu variable con la URL de imagen pública
                  },
                },
              ],
            },
          ]);
        return response.text;

    }
}