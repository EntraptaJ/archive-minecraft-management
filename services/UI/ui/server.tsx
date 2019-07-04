import { Request, Response } from 'express';
import React from 'react';
import { ServerLocation, isRedirect } from '@reach/router';
import { ApolloProvider, getMarkupFromTree } from '@apollo/react-hooks';
import { Capture, preloadAll } from 'react-loadable';
import { getStyles } from 'typestyle';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { Document, AppState, Source } from './Document';
import { readJSON } from 'fs-extra';
import { PropProvider, PathPropsObject, Props, resetProps } from './Prop';
import { initApollo } from '~lib/initApollo';

export async function uiServer(req: Request, res: Response) {
  await preloadAll();
  resetProps();
  const manifestFile = 'dist/public/parcel-manifest.json';
  const cssFile = 'dist/CSS.json';
  const [parcelManifest, cssManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
    readJSON(cssFile) as Promise<{ [any: string]: string }>,
  ]);

  const client = initApollo({ baseUrl: process.env.APIURL as string, token: req.universalCookies.get('token') });

  const sources: Source[] = [
    { type: 'script', src: parcelManifest['client.tsx'] },
    { type: 'style', src: cssManifest['client.tsx'] },
  ];

  let modules: string[] = [];

  let sessionProps: PathPropsObject[] = [];
  let STF: any;

  let html = '';
  try {
    try {
      await getMarkupFromTree({
        renderFunction: renderToString,
        tree: (
          <ServerLocation url={req.url}>
            <ApolloProvider client={client}>
              <PropProvider req={req} props={{}} sessionProps={sessionProps} client={client}>
                <App />
              </PropProvider>
            </ApolloProvider>
          </ServerLocation>
        ),
      });
      sessionProps = [{ path: req.path, props: await Props }];
      STF = await Props;
    } catch (error) {
      if (isRedirect(error)) {
        res.redirect(error.uri);
        return
      } else {
        // sessionProps = [{ path: req.path, props: await Props }];
        //STF = await Props;
      }

    }
    html = renderToString(
      <ServerLocation url={req.url}>
        <Capture report={moduleName => modules.push(moduleName)}>
          <PropProvider req={req} props={STF} sessionProps={sessionProps} client={client}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </PropProvider>
        </Capture>
      </ServerLocation>,
    );
  } catch (error) {
    if (isRedirect(error)) {
      res.redirect(error.uri);
      return;
    } else {
    }
  }

  modules.map(moduleName =>
    Object.entries(parcelManifest)
      .filter(([a, b]) => a === moduleName || cssManifest[moduleName] === b)
      .map(([modulePath, file]) => sources.unshift({ src: file, type: file.includes('.js') ? 'script' : 'style' })),
  );

  const APP_STATE: AppState = { SESSIONPROPS: sessionProps, APOLLO_STATE: client.cache.extract(), PROPS: STF || {} };

  const document = renderToString(<Document html={html} state={APP_STATE} sources={sources} css={getStyles()} />);

  res.status(200).send(`<!DOCTYPE html>${document}`);
}
