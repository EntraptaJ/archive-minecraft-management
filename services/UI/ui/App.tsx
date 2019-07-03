import React, { useContext } from 'react';
import { cssRule } from 'typestyle'
import { Routes } from './routes/index';

cssRule('html', {
  height: '100%'
})

cssRule('body, #app', {
  background: '#eee',
  margin: 0,
  height: '100%'
})

export const App: React.FunctionComponent = () => {
  return <Routes />;
};

/**
 *     <PropContext.Provider
      value={{
        props,
        sessionProps,
        setSTF: props => {
          setProps(props());
        },
      }}
    >
      <Routes />
    </PropContext.Provider>
 */
