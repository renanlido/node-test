import { ExpressAdapter } from '../adapters/expess.adapter';
import { UserRepository } from '../repository/user.repository';

import { ClientController } from '@/core/modules/client/infra/controller';
import { UserController } from '@/core/modules/user/infra/controller';

const app = new ExpressAdapter();

// using InMemoryUserRepository for testing purposes
UserController.create(app, new UserRepository());
ClientController.create(app);

app.listen(3334);
