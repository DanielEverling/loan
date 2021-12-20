import { Notification } from "../notification";
import { ValueObject } from "../value.object";
import "../../extensions/string"

export class Address implements ValueObject {
    
    private constructor(readonly street: string, 
        readonly number: string,
        readonly complement: string,
        readonly neighborhood: string,
        readonly city: string,
        readonly state: string,
        readonly zipcode: string
    ) {}
    
    public static of(street: string, 
        number: string,
        complement: string,
        neighborhood: string,
        city: string,
        state: string,
        zipcode: string) : Address {
            return new Address(street, number, complement, neighborhood, city, state, zipcode)
    }

    validators(): Array<Notification> {
        return [
            this.street.isEmpty('Street is required.'),
            this.street.validateSizeLessThan(100,  'Street should be less than 100 characters.'),
            this.number.validateSizeLessThan(6, 'Number should be less than 6 characters.'),
            this.neighborhood.isEmpty('Neighborhood is required.'),
            this.neighborhood.validateSizeLessThan(50,'Neighborhood should be less than 50 characters.'),
            this.zipcode.hasPattern('\\d{5}-\\d{3}', 'Zipcode is required.'),
            this.city.isEmpty('City is required.'),
            this.city.validateSizeLessThan(50, 'City should be less than 50 characters.'),
            this.state.isEmpty('State is required.'),
            this.state.validateSizeLessThan(2, 'State should be less than 2 characters.'),
            this.complement.validateSizeLessThan(100, 'Complement should be less than 100 characters.')
        ]
    }

}