import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('COFFEE') coffees: string[],
  ) {
    console.log(coffees);
  }
}
