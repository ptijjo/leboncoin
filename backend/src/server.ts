import { App } from '@/app';
import { UserRoute } from '@routes/users.route';
import { ArticleRoute } from '@routes/articles.route';
import { ValidationRoute } from '@routes/validations.route';

import { ValidateEnv } from '@utils/validateEnv';
import { CategoryRoute } from './routes/categories.route';

ValidateEnv();

const app = new App([new UserRoute(), new ValidationRoute(), new ArticleRoute(), new CategoryRoute()]);

app.listen();
