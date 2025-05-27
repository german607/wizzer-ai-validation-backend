import { Body, Controller, Post } from "@nestjs/common";
import { LLMService } from "./llm.service";


@Controller()
export class LLMController {

    constructor(private readonly llmService: LLMService) {}


  @Post('generate')
  async generateResponse(): Promise<string> {
    return this.llmService.generateResponse();
  }

  @Post('analyze-image')
  async analyzeImage(@Body() body: { imageUrl: string}) : Promise<string> {
    return this.llmService.analyzeImage(body.imageUrl);
  }
}