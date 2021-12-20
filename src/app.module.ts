import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [],
  controllers: [CustomerModule],
  providers: [],
})
export class AppModule {}
