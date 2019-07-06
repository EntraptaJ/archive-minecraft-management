import React, { createContext, ReactNode, useState } from 'react';
import { Request } from 'express';
import { globalHistory } from '@reach/router';

export let Props: Promise<any>;

export interface PathPropsObject {
  path: string;
  props: any;
}

export const resetProps = () => {
  // @ts-ignore
  Props = undefined
}

export type getProp = (req?: import('express').Request, client?: import('apollo-client').ApolloClient<import('apollo-cache-inmemory').NormalizedCacheObject>, ) => Promise<any>;

interface PropContextType {
  props: any;
  sessionProps: PathPropsObject[];
  useProps: (prop: getProp) => void;
  req?: Request;
  client?: import('apollo-client').ApolloClient<import('apollo-cache-inmemory').NormalizedCacheObject>;
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
  client: import('apollo-client').ApolloClient<import('apollo-cache-inmemory').NormalizedCacheObject>;
}

const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const PropProvider = (prop: PropProviderProps) => {
  const { req, children, sessionProps, client } = prop;
  const [props, setProps] = useState(prop.props)
  const useProps = (newProp: getProp) => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === (req ? req.path : globalHistory.location.pathname));

    if (oldProps) Props = oldProps.props;
    else Props = newProp(req, client);
  };

  globalHistory.listen(async (c) => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === c.location.pathname)

    if (oldProps) setProps(oldProps.props || {})
    else {
      await timeout(50)
      if (typeof (await Props) === 'undefined') return
      sessionProps.push({ path: c.location.pathname, props: (await Props) || {} })
      setProps((await Props) || {})
    }
    
  })

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
