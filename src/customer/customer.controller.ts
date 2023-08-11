import { Request, Response } from 'express';
import CustomerService from './customer.service';

class CustomerController {
  constructor(private readonly customerService: CustomerService = new CustomerService()) {}

  async getAllCustomers(_req: Request, res: Response) {
    const customers = await this.customerService.getAllCustomers();
    return res.status(200).json({
      ok: true,
      customers,
    });
  }

  async getCustomersById(req: Request, res: Response) {
    const { id } = req.params;
    const customer = await this.customerService.getCustomersById(id);
    return res.status(200).json({
      ok: true,
      customer,
    });
  }

  async createCustomer(req: Request, res: Response) {
    const { body } = req;
    const newCustomer = await this.customerService.createCustomer(body);
    return res.status(200).json({
      ok: true,
      newCustomer,
    });
  }

  async deleteCustomersById(req: Request, res: Response) {
    const { id } = req.params;
    await this.customerService.deleteCustomersById(id);
    return res.status(200).json({
      ok: true,
      message: 'Customer deleted successfully',
    });
  }

  async updateCustomers(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    const updateUser = await this.customerService.updateCustomers(body, id);
    return res.status(200).json({
      ok: true,
      updateUser,
    });
  }
}

export default CustomerController;
