import { ApolloProvider } from '@apollo/react-hooks';
import { preloadReady } from 'react-loadable'
import React from 'react';
import { PathPropsObject, PropProvider } from '~Prop';
import { Renderer, hydrate } from 'react-dom';
import { get } from 'js-cookie';
import { setStylesTarget } from 'typestyle';
import { App as AppComponent } from '~App';

import { initApollo } from '~lib/initApollo';
import { ConfigProvider } from '~Components/ConfigProvider';

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  await preloadReady()
  let sessionProps: PathPropsObject[] = [];
  const StyleElement = document.getElementById('styles');
  if (StyleElement) setStylesTarget(StyleElement);
  let PageProps = window.APP_STATE.PROPS;
  sessionProps = window.APP_STATE.SESSIONPROPS;
  const client = initApollo({
    baseUrl: window.APP_STATE.CONFIG.baseUrl,
    initialState: window.APP_STATE.APOLLO_STATE,
    token: get('token'),
  });
  renderFunction(
    <ApolloProvider client={client}>
      <ConfigProvider {...window.APP_STATE.CONFIG}>
        <PropProvider props={PageProps} sessionProps={sessionProps} client={client}>
          <App />
        </PropProvider>
      </ConfigProvider>
    </ApolloProvider>,
    document.getElementById('app'),
  );
}

render(hydrate, AppComponent);

if (process.env.NODE_ENV === 'development') {
  const hot = (module as any).hot;
  if (hot && hot.accept) {
    hot.accept(async () => {
      const { render: renderApp } = require('react-dom');
      const App = require('./App').App;
      render(renderApp, App);
    });
  }
}
