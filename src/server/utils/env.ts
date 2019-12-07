/*
  access process.env only once, to avoid performance issues due to execute
  node native implementation.
*/
const {
  NODE_ENV,
  PACKAGE_VERSION,
} = process.env;

const PRODUCTION = NODE_ENV === 'production';
const DEVELOPMENT = NODE_ENV === 'development';

export {
  NODE_ENV,
  PRODUCTION,
  DEVELOPMENT,
  PACKAGE_VERSION,
};
