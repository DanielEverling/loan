import {
    Body,
    Controller,
    Post,
    Res,
    Query,
  } from '@nestjs/common';

import { CreateCustomerCommandHandler } from '../application/command/ create.customer.command.handler';
  
  @Controller()
  export class CreateCustomerController {
    constructor(
      private readonly createCustomerCommandHandler: CreateCustomerCommandHandler,
    ) {}

    @Post()
    create(@Res() response, @Body() createPersonCommand) { 
        const cutomerNotifications = this.createCustomerCommandHandler.handler(createPersonCommand) 
   
        // Here it could be a result
        // The result should return only domain errors and we should convert here to HTTP status.

        if(cutomerNotifications){
            return response.status(404).send();
        }

        return response.send();

    }
  }
  