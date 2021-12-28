import { CustomerRepository } from "@base/customer/application/domain/customer.repository";
import {CustomerSequelize} from './customer.entity.sequelize'
import { Customer } from "../application/domain/customer";
import { Address } from "../../shared/domain/vo/address";

export class CustomerRepositorySequelize implements CustomerRepository {
    findBySSNumber(){
        return null
    }

    public async save(customer: Customer): Promise<Customer> {
        const sequelizeCustomer = CustomerSequelize.build({
            id: customer.id,
            fullname: customer.fullname.value,
            email: customer.email.value,
            ssNumber: customer.ssNumber.value,
            address: customer.address
        });
        await sequelizeCustomer.save();
    
        return customer;
    }

    public async updateAddress(address: Address, customerId: string): Promise<Address>{

        const sequelizeCustomer = await CustomerSequelize.findByPk(customerId)

        sequelizeCustomer.setDataValue('address',address)

        await sequelizeCustomer.save();

        return address
    }
}