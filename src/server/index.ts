import Server from './server';
import routes from './routes';

Server({
  routes,
  staticAssets: ['build'],
});
