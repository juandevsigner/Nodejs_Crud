import { DeleteResult, UpdateResult } from 'typeorm';
import { BaseService } from '../config/base.service';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerDTO } from './dto/customer.dto';

class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async getAllCustomers(): Promise<CustomerEntity[]> {
    return (await this.useRepository).find();
  }

  async getCustomersById(id: string): Promise<CustomerEntity | null> {
    return (await this.useRepository).findOneBy({ id });
  }

  async createCustomer(customer: CustomerDTO): Promise<CustomerEntity> {
    // const newCustomer = await (await this.useRepository).create(customer);
    return (await this.useRepository).save(customer);
  }

  async deleteCustomersById(id: string): Promise<DeleteResult | null> {
    return (await this.useRepository).delete({ id });
  }

  async updateCustomers(customerBody: CustomerDTO, id: string): Promise<UpdateResult | null> {
    return (await this.useRepository).update(id, customerBody);
  }
}

export default CustomerService;
