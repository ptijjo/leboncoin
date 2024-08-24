import { App } from '@/app';
import { UserRoute } from '@routes/users.route';
import { ArticleRoute } from '@routes/articles.route';
import { ValidationRoute } from '@routes/validations.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

const app = new App([new UserRoute(), new ArticleRoute(), new ValidationRoute()]);

app.listen();
