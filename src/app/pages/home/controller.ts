import App from './components/App';
import { getManifest } from './manifest';

const render = async (req, res) => {
  const manifest = await getManifest();

  res.render(
    App,
    { /* TODO: state */ },
    [
      manifest['app.js'],
      manifest['vendor.js'],
    ],
  );
};

export {
  render,
};
