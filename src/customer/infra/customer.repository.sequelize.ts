import { CustomerRepository } from "@base/customer/application/domain/customer.repository";
import {CustomerSequelize} from './customer.entity.sequelize'
import { Customer } from "../application/domain/customer";

export class CustomerRepositorySequelize implements CustomerRepository {
    findBySSNumber(){
        return null
    }

    public async save(customer: Customer): Promise<Customer> {
        try{
            const sequelizeCustomer = CustomerSequelize.build({
                id: customer.id,
                fullname: customer.fullname.value,
                email: customer.email.value,
                ssNumber: customer.ssNumber.value,
                address: customer.address
            });
            await sequelizeCustomer.save();
        }catch(err){
            console.log(err)
        }finally{
            return customer;
        }
    }
    updateAddress(){
        return null
    }
}