import { Router } from 'express';
import CustomerController from '../customer/customer.controller';
import { ValidateMiddlewareDTO } from '../shared/middleware/validate-dto.middleware';
import { BaseRoute } from '../shared/router/base.router';
import { CustomerDTO } from '../customer/dto/customer.dto';

class CustomerRoute extends BaseRoute<CustomerController, ValidateMiddlewareDTO> {
  public path = '/customers';
  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    super(CustomerController, ValidateMiddlewareDTO);
    this.initCustomerRoutes();
  }

  public initCustomerRoutes() {
    this.router.get(`${this.path}`, (req, res) => this.customerController.getAllCustomers(req, res));

    this.router.get(`${this.path}/:id`, (req, res) => this.customerController.getCustomerById(req, res));

    this.router.post(
      `${this.path}`,
      (req, res, next) => [this.middleware.validator(req, res, next, CustomerDTO)],
      (req, res) => this.customerController.createCustomer(req, res),
    );

    this.router.put(`${this.path}/:id`, (req, res) => this.customerController.updateCustomer(req, res));

    this.router.delete(`${this.path}/:id`, (req, res) => this.customerController.deleteCustomerById(req, res));
  }
}

export default CustomerRoute;
