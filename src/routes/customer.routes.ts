import { Router } from 'express';
import CustomerController from '../customer/customer.controller';
import { Routes } from '../interfaces/route.interface';

class CustomerRoutes implements Routes {
  public path? = '/customer';
  public router = Router();
  private customerControler = new CustomerController();

  constructor() {
    this.initCustomerRoutes();
  }

  public initCustomerRoutes(): void {
    this.router.get(`${this.path}`, async (req, res) => this.customerControler.getAllCustomers(req, res));

    this.router.post(`${this.path}`, async (req, res) => this.customerControler.createCustomer(req, res));

    this.router.get(`${this.path}/:id`, async (req, res) => this.customerControler.getCustomersById(req, res));

    this.router.put(`${this.path}/:id`, async (req, res) => this.customerControler.updateCustomers(req, res));

    this.router.delete(`${this.path}/:id`, async (req, res) => this.customerControler.deleteCustomersById(req, res));
  }
}

export default CustomerRoutes;
