// UI/ui/Components/Admin/ChatBox/ChatItem/index.tsx
import { Card } from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import React, { FunctionComponent } from 'react';
import './ChatItem.css';

interface ChatItemProps {
  message: string;
}

type ChatItemType = FunctionComponent<ChatItemProps>;

export const ChatItem: ChatItemType = ({ message }) => {
  return (
    <Card style={{ marginTop: '1rem', padding: '0 1em 0 1em', width: '100%' }}>
      <Typography use='subtitle1' tag='h2' style={{ whiteSpace: 'pre-wrap' }}>
        <span style={{ fontWeight: 'bold' }}>Server: </span>
        {message}
      </Typography>
    </Card>
  );
};
