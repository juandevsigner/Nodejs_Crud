import App from './app';
import BaseRoute from './routes/base.routes';
import UserRoutes from './routes/user.routes';

const app = new App([new BaseRoute(), new UserRoutes()]);

app.listen();
