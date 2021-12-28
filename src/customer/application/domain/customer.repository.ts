import { Address } from '@base/shared/domain/vo/address';
import { SSNumber } from '@base/shared/domain/vo/ssnumber';
import { Customer } from './customer';

export interface CustomerRepository {
  findBySSNumber(number: SSNumber): Promise<Customer>;

  save(customer: Customer): Promise<Customer>;

  updateAddress(address: Address, customerId: string): Promise<Address>;
}
