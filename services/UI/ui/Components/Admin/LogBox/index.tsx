// UI/ui/Components/Admin/Logs/index.tsx
import { useQuery } from '@apollo/react-hooks';
import { Typography } from '@rmwc/typography';
import React from 'react';
import { FormStyle } from 'ui/lib/styles';
import './LogBox.css';
import GETLOGSGQL from './Logs.graphql';

export const LogBox = () => {
  const { data } = useQuery<{ getLogs: string }>(GETLOGSGQL, { pollInterval: 2000 });
  return (
    <div style={{ ...FormStyle, maxWidth: '89%' }}>
      <Typography use='headline4'>Server Logs</Typography>
      <div
        style={{
          height: '55vh',
          background: '#f0f0f0',
          whiteSpace: 'pre-wrap',
          overflowY: 'scroll',
          borderRadius: '1em',
          padding: '1em',
          maxWidth: '98%',
          boxShadow: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
        }}
      >
        {data ? (
          <div style={{ width: '100%' }}>
            <Typography use='subtitle1' tag='h2' style={{ whiteSpace: 'pre-wrap' }}>
              {data.getLogs}
            </Typography>
          </div>
        ) : (
          'Loading'
        )}
      </div>
    </div>
  );
};
