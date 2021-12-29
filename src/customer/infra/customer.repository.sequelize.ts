import { CustomerRepository } from '@base/customer/application/domain/customer.repository';
import { CustomerSequelize } from './customer.entity.sequelize';
import { Customer } from '../application/domain/customer';
import { Address } from '../../shared/domain/vo/address';
import { SSNumber } from '@shared/domain/vo/ssnumber';
import { DefaultSpecification } from '@shared/domain/default.specification';
import { FullName } from '@shared/domain/vo/fullname';
import { Email } from '@shared/domain/vo/email';
export class CustomerRepositorySequelize implements CustomerRepository {

  public async findBySSNumber(ssNumber: SSNumber): Promise<Customer> {
    const found = await CustomerSequelize.findOne({
      where: { ssNumber: ssNumber.value },
    });

    if (!found) {
      return null;
    }

    const json = found.toJSON();

    try {
      const foundCustomer = Customer.build({
        fullname: FullName.of(json.fullname),
        email: Email.of(json.email),
        address: Address.of(
          json.address.street,
          json.address.number,
          json.address.complement,
          json.address.neighborhood,
          json.address.city,
          json.address.state,
          json.address.zipcode,
        ),
        ssNumber: ssNumber,
        specification: DefaultSpecification.of(),
      });
      return foundCustomer.entity();
    } catch (e) {
      return null;
    }
  }

  public async save(customer: Customer): Promise<Customer> {
    const sequelizeCustomer = CustomerSequelize.build({
      id: customer.id,
      fullname: customer.fullname.value,
      email: customer.email.value,
      ssNumber: customer.ssNumber.value,
      address: customer.address,
    });
    await sequelizeCustomer.save();

    return customer;
  }

  public async updateAddress(
    address: Address,
    customerId: string,
  ): Promise<Address> {
    const sequelizeCustomer = await CustomerSequelize.findByPk(customerId);

    sequelizeCustomer.setDataValue('address', address);

    await sequelizeCustomer.save();

    return address;
  }
}
