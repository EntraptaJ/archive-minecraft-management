// UI/ui/Components/Admin/Logs/index.tsx
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GETLOGSGQL from './Logs.graphql';
import { FormStyle } from '~lib/styles';
import '@material/theme/dist/mdc.theme.min.css';
import { Typography } from '@rmwc/typography';

export const LogBox = () => {
  const { data } = useQuery<{ getLogs: string }>(GETLOGSGQL, { pollInterval: 2000 });
  return (
    <div style={{ ...FormStyle, height: '60vh', maxWidth: '655px', padding: '1em 1em 0 1em' }}>
      <Typography use='headline4'>Server Logs</Typography>
      <div
        style={{
          height: '60vh',
          maxWidth: '655px',
          background: '#f0f0f0',
          whiteSpace: 'pre-wrap',
          overflowY: 'scroll',
          borderRadius: '1em',
          padding: '1em',
          boxShadow: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
          marginTop: '1em'
        }}
      >
        {data ? data.getLogs : 'Loading'}
      </div>
    </div>
  );
};
