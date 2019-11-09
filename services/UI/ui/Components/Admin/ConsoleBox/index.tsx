// UI/ui/Components/Admin/ChatBox/index.tsx
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { TextField } from '@rmwc/textfield';
import { Typography } from '@rmwc/typography';
import React, { useState } from 'react';
import { FormStyle } from 'ui/lib/styles';
import { ChatItem } from './ChatItem';
import './ConsoleBox.css';
import SENDCOMMANDGQL from './sendCommand.graphql';
import SUBSCRIBEGQL from './subRCON.graphql';

export const AdminServerConsoleBox = () => {
  const [text, setText] = useState<string>('');
  const { loading, data } = useSubscription<{ RCON: string }>(SUBSCRIBEGQL);
  const [sendCommand] = useMutation<{}, { command: string }>(SENDCOMMANDGQL);
  const [history] = useState<string[]>([]);
  if (!loading && data && history[history.length - 1] !== data.RCON) history.push(data.RCON);

  const handleKeyPress = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      await sendCommand({ variables: { command: text } });
      setText('');
    }
  };

  return (
    <div style={{ ...FormStyle, maxWidth: '89%' }}>
      <Typography use='headline4'>Minecraft Server Console</Typography>
      {loading ? (
        <Typography use='body1'>Loading</Typography>
      ) : (
        data && (
          <div
            style={{
              overflowY: 'scroll',
              height: '98%',
              maxWidth: '90vw',
            }}
          >
            {history.map((string, index) => (
              <ChatItem key={index} message={string} />
            ))}
          </div>
        )
      )}
      <TextField
        label='Send Command'
        outlined
        style={{ marginTop: '1em', width: '100%' }}
        onKeyPress={handleKeyPress}
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => setText(target.value)}
        value={text}
      />
    </div>
  );
};
