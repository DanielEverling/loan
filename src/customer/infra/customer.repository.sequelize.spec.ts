
import {CustomerRepositorySequelize} from './customer.repository.sequelize'
import { CustomerSequelize } from './customer.entity.sequelize'
import { Customer } from '../application/domain/customer';
import { FullName } from '@base/shared/domain/vo/fullname';
import { Email } from '@base/shared/domain/vo/email';
import { SSNumber } from '@base/shared/domain/vo/ssnumber';
import { Address } from '@base/shared/domain/vo/address';
import { DefaultSpecification } from '@base/shared/domain/default.specification';
import { sequelize } from '@base/main';

const customerRepository = new CustomerRepositorySequelize();


const makeCustomerEntity = (data?:object):Customer => {
    const customer = Customer.build(
        {
            fullname : FullName.of('jhon doe'),
            email : Email.of('jhondoe@mail.com'),
            ssNumber : SSNumber.of('111111111'),
            address : Address.of(
                'some address',
                '233',
                'NA',
                'some neigborhood',
                'some city',
                'CA',
                '10399-111',
            ),
            specification : DefaultSpecification.of(),
            ...data
        },
    )
    return customer.entity();
}

describe('customer repository sequelize', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true});
        console.log('sync')
    })

    describe('save method', () => {
        it('should be able to persist a customer on the database', async () => {
            
            const customer = makeCustomerEntity();

            const savedCustomer = await customerRepository.save(customer);
            
            const createdCustomer = await CustomerSequelize.findByPk(customer.id)

            expect(createdCustomer).toEqual(expect.objectContaining(
                {"address": {"city": "some city", "complement": "NA", "neighborhood": "some neigborhood", "number": "233", "state": "CA", "street": "some address", "zipcode": "10399-111"}, "email": "jhondoe@mail.com", "fullname": "jhon doe", "id": customer.id, "ssNumber": "111-11-1111"}
            ))
            expect(customer).toEqual(savedCustomer)
        })

    })

})