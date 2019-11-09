import { ApolloProvider } from '@apollo/react-hooks';
import { globalHistory } from '@reach/router';
import { get } from 'js-cookie';
import React from 'react';
import { hydrate, render as ReactDOMRender, Renderer } from 'react-dom';
import { preloadReady } from 'react-loadable';
import { setStylesTarget } from 'typestyle';
import AppComponent from 'ui/App';
import { ConfigProvider } from 'ui/Components/ConfigProvider';
import { clearHead, Hashes, HeadProvider } from 'ui/Components/HeadProvider';
import { PathPropsObject, PropProvider, Props, setNewProps, setProps } from 'ui/Components/PropProvider';
import { initApollo } from 'ui/lib/initApollo';

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    const worker = await navigator.serviceWorker.register('/service-worker.ts', { scope: '/' });
    console.log('SW registered: ', worker);
  });
}

const hashes: string[] = [];

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  await preloadReady();

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
          <HeadProvider tags={[]} hashes={hashes}>
            <App />
          </HeadProvider>
        </PropProvider>
      </ConfigProvider>
    </ApolloProvider>,
    document.getElementById('app'),
  );
}

globalHistory.listen(async loc => {
  await clearHead(Hashes);
  const hasProps = await setNewProps(loc);
  if (hasProps) await clearHead(Hashes);
});

preloadReady().then(() => render(hydrate, AppComponent));

const hot = (module as any).hot;
if (hot && hot.accept) {
  hot.accept(async () => {
    window.APP_STATE.SESSIONPROPS = [];
    window.APP_STATE.APOLLO_STATE = {};
    await timeout(50);
    setProps(await Props);
    render(ReactDOMRender, require('./App').default);
  });
}
