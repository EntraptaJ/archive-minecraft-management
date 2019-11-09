import { ApolloProvider, getDataFromTree } from '@apollo/react-hooks';
import { ServerPortal } from '@jesstelford/react-portal-universal/server';
import { isRedirect, ServerLocation } from '@reach/router';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { readJSON } from 'fs-extra';
import 'isomorphic-unfetch';
import { Context } from 'koa';
import React from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { Capture, preloadAll } from 'react-loadable';
import App from 'ui/App';
import { Config } from 'ui/Components/ConfigProvider';
import { HeadProvider } from 'ui/Components/HeadProvider';
import { PathPropsObject, PropProvider, Props, resetProps } from 'ui/Components/PropProvider';
import { initApollo } from 'ui/lib/initApollo';

export interface AppState {
  PROPS: any;
  APOLLO_STATE: NormalizedCacheObject;
  SESSIONPROPS: PathPropsObject[];
  CONFIG: Config;
}

export const uiServer = async (ctx: Context, config: Config) => {
  await preloadAll();
  await resetProps();
  ctx.respond = false;
  ctx.status = 200;
  const manifestFile = `dist/public/parcel-manifest.json`;
  const cssFile = `dist/CSS.json`;
  const [parcelManifest, cssManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
    readJSON(cssFile) as Promise<{ [any: string]: string }>,
  ]);
  interface Source {
    src: string;
    type: 'script' | 'style';
  }

  const sources: Source[] = [
    { type: 'script', src: parcelManifest['client.tsx'] },
    { type: 'style', src: cssManifest['client.tsx'] },
    { type: 'style', src: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500' },
    { type: 'style', src: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
  ];
  const modules: string[] = [];
  let sessionProps: PathPropsObject[] = [];
  let localProps: any;
  const head: JSX.Element[] = [];
  const hashes: string[] = [];

  const client = initApollo({ baseUrl: config.baseUrl, token: ctx.cookies.get('token') });

  try {
    renderToString(
      <ServerLocation url={ctx.url}>
        <ApolloProvider client={client}>
          <PropProvider ctx={ctx} sessionProps={sessionProps} props={{}} client={client}>
            <HeadProvider tags={head} hashes={hashes}>
              <App />
            </HeadProvider>
          </PropProvider>
        </ApolloProvider>
      </ServerLocation>,
    );
    // Prerender to get Modules and shit
    await getDataFromTree(
      <ServerLocation url={ctx.url}>
        <Capture report={moduleName => modules.push(moduleName)}>
          <ApolloProvider client={client}>
            <PropProvider ctx={ctx} sessionProps={sessionProps} props={{}} client={client}>
              <HeadProvider tags={head} hashes={hashes}>
                <App />
              </HeadProvider>
            </PropProvider>
          </ApolloProvider>
        </Capture>
      </ServerLocation>,
    );
    localProps = (await Props) || {};
    sessionProps = [{ path: ctx.path, props: (await Props) || {} }];
  } catch (e) {
    if (isRedirect(e)) {
      ctx.redirect(e.uri);
      ctx.res.end();
      return;
    }

    localProps = (await Props) || {};
    sessionProps = [{ path: ctx.path, props: (await Props) || {} }];
  }

  modules.map(moduleName =>
    Object.entries(parcelManifest)
      .filter(([a, b]) => a === moduleName || cssManifest[moduleName] === b)
      .map(([modulePath, file]) => sources.unshift({ src: file, type: file.includes('.js') ? 'script' : 'style' })),
  );

  const MainApp = (
    <ServerLocation url={ctx.url}>
      <ApolloProvider client={client}>
        <PropProvider ctx={ctx} sessionProps={sessionProps} props={localProps} client={client}>
          <HeadProvider tags={head} hashes={hashes}>
            <App />
          </HeadProvider>
        </PropProvider>
      </ApolloProvider>
    </ServerLocation>
  );

  const portals = new ServerPortal();
  const element = portals.collectPortals(MainApp);
  const test = portals.appendUniversalPortals(renderToString(element));

  const componentStream = renderToNodeStream(<></>);

  const Head = renderToString(
    <head>
      <link rel='manifest' href='/manifest.webmanifest' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {...head}
      {sources && sources.map(({ src, type }, index) => <link rel='preload' href={src} as={type} key={index} />)}
      {sources &&
        sources
          .filter(({ type }) => type === 'style')
          .map(({ src }, index) => <link rel='stylesheet' type='text/css' href={src} key={index} />)}
    </head>,
  );

  const htmlStart = `
  <!doctype html>
    <html>
      ${Head}
      <body class="mdc-typography">
      <div id="app">`;

  ctx.res.write(htmlStart);
  componentStream.pipe(
    ctx.res,
    { end: false },
  );

  const appState: AppState = {
    SESSIONPROPS: sessionProps,
    PROPS: localProps,
    APOLLO_STATE: client.cache.extract(),
    CONFIG: config,
  };

  const htmlEnd = `</div>
    <script type="text/javascript">window.APP_STATE = ${JSON.stringify(appState)}</script>
    ${renderToString(
      <>
        {' '}
        {sources &&
          sources
            .filter(({ type }) => type === 'script')
            .reverse()
            .map(({ src }, index) => <script async type='text/javascript' charSet='utf-8' key={index} src={src} />)}
      </>,
    )}
  </body>
  </html>`;

  componentStream.on('end', () => {
    ctx.res.write(test);
    ctx.res.write(htmlEnd);

    ctx.res.end();
  });
};
