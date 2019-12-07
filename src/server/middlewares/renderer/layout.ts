import serialize from 'serialize-javascript';
import { HelmetData } from 'react-helmet';

interface LayoutConfig {
  app: string;
  helmet: HelmetData;
  state?: {};
  scripts?: string[];
  styles?: string[];
}

const preloadScripts = (scripts: string[]) =>
  scripts
    .map((script) => `<link rel='preload' href='${script}' as='script' />`)
    .join('');

const createStyleTags = (paths: string[]) =>
  paths
    .map(path => `<link href="${path}" rel="stylesheet">`)
    .join('');

const buildLayout = ({
  app,
  helmet,
  state = {},
  scripts = [],
  styles = [],
}: LayoutConfig) => `<!DOCTYPE html>
<html lang="en-US">
<head>
${preloadScripts(scripts)}
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
${helmet.script.toString()}
${createStyleTags(styles)}
</head>
<body>
<main id="app-root">${app}</main>
<script>
(function initScripts() {
  window.__APP_STATE__ = ${serialize(state, { isJSON: true })};
  const scripts = ${JSON.stringify(scripts)};
  function downloadJS() {
    for (let i = 0; i < scripts.length; i++) {
      const element = document.createElement('script');
      element.src = scripts[i];
      document.head.appendChild(element);
    }
  }
  if (window.addEventListener) {
    window.addEventListener('load', downloadJS, false);
  } else {
    window.onload = downloadJS;
  }
})();
</script>
</body>
</html>
`;

export default buildLayout;