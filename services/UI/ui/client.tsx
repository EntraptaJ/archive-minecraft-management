import { ApolloProvider } from '@apollo/react-hooks';
import React from 'react';
import ReactDOM, { Renderer } from 'react-dom';
import { preloadReady } from 'react-loadable';
import Cookies from 'js-cookie';
import { setStylesTarget } from 'typestyle';
import { App as AppComponent } from '~App';
import { PathPropsObject, PropProvider } from '~Components/PropsProvider';
import { initApollo } from '~lib/initApollo';

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  let sessionProps: PathPropsObject[] = [];
  const StyleElement = document.getElementById('styles');
  if (StyleElement) setStylesTarget(StyleElement);
  let PageProps = window.APP_STATE.PROPS;

  sessionProps = window.APP_STATE.SESSIONPROPS;
  renderFunction(
    <PropProvider props={PageProps} sessionProps={sessionProps} path={window.location.pathname}>
      <ApolloProvider
        client={initApollo({
          baseUrl: 'http://192.168.254.179',
          initialState: window.APP_STATE.APOLLO_STATE,
          token: Cookies.get('token'),
        })}
      >
        <App />
      </ApolloProvider>
    </PropProvider>,
    document.getElementById('app'),
  );
}

preloadReady().then(() => render(ReactDOM.hydrate, AppComponent));

const hot = (module as any).hot;
if (hot && hot.accept) {
  hot.accept(async () => {
    render(ReactDOM.render, require('ui/App').App);
  });
}
