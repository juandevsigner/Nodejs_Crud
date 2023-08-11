import App from './app';
import BaseRoute from './routes/base.routes';
import CustomerRoutes from './routes/customer.routes';
import UserRoutes from './routes/user.routes';

const app = new App([new BaseRoute(), new UserRoutes(), new CustomerRoutes()]);

app.listen();
