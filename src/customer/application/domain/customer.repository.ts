import { SSNumber } from "@base/shared/domain/vo/ssnumber";
import { Customer } from "./customer";

export interface CustomerRepository {

    findBySSNumber(number: SSNumber): Customer
    
}