import { RealiseAccount } from './realise-account';
import { SolidController } from './solid.controller';
import { SolidService } from './solid.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [SolidController],
  providers: [SolidService, RealiseAccount],
})
export class SolidModule {}
