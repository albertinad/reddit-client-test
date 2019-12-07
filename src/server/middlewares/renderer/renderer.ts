import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import buildLayout from './layout';

const renderer = function renderMiddleware() {
  return async function renderMiddlewareFn(req, res, next) {
    function render(
      Component: React.ElementType,
      props: { [prop: string]: unknown },
      scripts?: string[],
      styles?: string[],
    ) {
      const app = ReactDOMServer.renderToString(React.createElement(Component, props));
      const helmet = Helmet.renderStatic();

      res.send(
        buildLayout({
          app,
          state: props,
          scripts,
          styles,
          helmet,
        }),
      );
    }

    res.render = render;

    next();
  };
};

export default renderer;