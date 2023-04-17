import { Body, Controller, Get } from '@nestjs/common';
import { SolidService } from './solid.service';

@Controller('solid')
export class SolidController {
  constructor(private service: SolidService) {}

  @Get()
  accountResponse(@Body() params: any) {
    return this.service.accountResponse(params.calc, params.name);
  }

  @Get('resp')
  response() {
    return this.service.getResponse();
  }
}
