import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [],
})
export class SharedModule {}
