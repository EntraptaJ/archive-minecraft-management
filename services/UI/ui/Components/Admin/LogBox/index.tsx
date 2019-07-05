// UI/ui/Components/Admin/Logs/index.tsx
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GETLOGSGQL from './Logs.graphql';
import { FormStyle } from '~lib/styles';
import '@material/theme/dist/mdc.theme.min.css';


export const LogBox = () => {
  const { data } = useQuery<{ getLogs: string }>(GETLOGSGQL);
  return (
    <div style={{ ...FormStyle, height: '60vh', maxWidth: '550px', background: '#f0f0f0', whiteSpace: 'pre-wrap', overflowY: 'scroll' }}>
    {data ? data.getLogs : 'Loading'}
    </div>
  );
};
