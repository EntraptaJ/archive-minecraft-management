import React from 'react';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { PathPropsObject } from '~components/PropsProvider';

export interface Source {
  src: string;
  type: 'script' | 'style';
}

export interface AppState {
  PROPS: any;
  APOLLO_STATE: NormalizedCacheObject;
  SESSIONPROPS: PathPropsObject[];
}

interface DocumentProps {
  html: string;
  sources?: Source[];
  css?: string;
  state: AppState;
}

export function Document({ html, css, state, sources }: DocumentProps) {
  return (
    <html lang='en-US'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        {sources && sources.map(({ src, type }, index) => <link rel='preload' href={src} as={type} key={index} />)}
        {sources &&
          sources
            .filter(({ type }) => type === 'style')
            .map(({ src }, index) => <link rel='stylesheet' type='text/css' href={src} key={index} />)}
        {css ? <style id='styles'>{css}</style> : null}
      </head>
      <body>
        <div id='app' dangerouslySetInnerHTML={{ __html: html }} />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.APP_STATE = { PROPS: ${JSON.stringify(state.PROPS)}, APOLLO_STATE: ${JSON.stringify(
              state.APOLLO_STATE,
            )}, SESSIONPROPS: ${JSON.stringify(state.SESSIONPROPS)} };`,
          }}
        />
        {sources &&
          sources.filter(({ type }) => type === 'script').map(({ src }, index) => <script key={index} src={src} async />)}
      </body>
    </html>
  );
}
