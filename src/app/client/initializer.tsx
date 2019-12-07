import React from 'react';
import ReactDOM from 'react-dom';

interface IStateWindow extends Window {
  __APP_STATE__: {
    [key: string]: unknown;
  };
}

const init = (Component: React.FunctionComponent, containerSelector: string = '#app-root') => {
  const props = (window as unknown as IStateWindow).__APP_STATE__;

  const appComponent = (
    <Component {...props} />
  );

  ReactDOM.hydrate(
    appComponent,
    document.querySelector(containerSelector),
  );
};

export default init;
