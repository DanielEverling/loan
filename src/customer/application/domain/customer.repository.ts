import { Address } from "@base/shared/domain/vo/address";
import { SSNumber } from "@base/shared/domain/vo/ssnumber";
import { Customer } from "./customer";

export interface CustomerRepository {

    findBySSNumber(number: SSNumber): Customer
    
    save(customer: Customer)

    updateAddress(address: Address, ssNumber: SSNumber)
}