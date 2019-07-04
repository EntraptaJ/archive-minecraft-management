import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Request } from 'express';
import { globalHistory } from '@reach/router';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export let Props: Promise<any>;

export interface PathPropsObject {
  path: string;
  props: any;
}

export const resetProps = () => {
  // @ts-ignore
  Props = undefined
}

export type getProp = (req?: import('express').Request, client?: ApolloClient<NormalizedCacheObject>, ) => Promise<any>;

interface PropContextType {
  props: any;
  sessionProps: PathPropsObject[];
  useProps: (prop: getProp) => void;
  req?: Request;
  client?: ApolloClient<NormalizedCacheObject>;
}

export const PropContext = createContext<PropContextType>({
  useProps: props => {
    Props = props();
  },
  // @ts-ignore
  props: Props,
  sessionProps: [],
  req: undefined,
  client: undefined,
});

interface PropProviderProps {
  children: ReactNode;
  req?: Request;
  props: any;
  sessionProps: PathPropsObject[];
  client: ApolloClient<NormalizedCacheObject>;
}

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PropProvider = (prop: PropProviderProps) => {
  const { req, children, props, sessionProps, client } = prop;

  const useProps = (newProp: getProp) => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === (req ? req.path : globalHistory.location.pathname));

    if (oldProps) Props = oldProps.props;
    else Props = newProp(req, client);
  };

  return (
    <PropContext.Provider
      value={{
        useProps,
        props,
        sessionProps,
        req,
        client,
      }}
    >
      {children}
    </PropContext.Provider>
  );
};
