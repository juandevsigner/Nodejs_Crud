import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import CustomerController from '../customer/customer.controller';

class UserRoutes implements Routes {
  public path? = '/user';
  public router = Router();
  private userController = new CustomerController();

  constructor() {
    this.initUserRoutes();
  }

  public initUserRoutes(): void {
    this.router.get(`${this.path}`, this.userController.getAllCustomers);

    this.router.get(`${this.path}/:id`, this.userController.getCustomersById);

    this.router.post(`${this.path}`, this.userController.createCustomer);

    this.router.put(`${this.path}/:id`, this.userController.updateCustomers);

    this.router.delete(`${this.path}/:id`, this.userController.deleteCustomersById);
  }
}
export default UserRoutes;
