// UI/ui/Components/Admin/ChatBox/index.tsx
import React, { useState } from 'react';
import SUBSCRIBEGQL from './subRCON.graphql';
import SENDCOMMANDGQL from './sendCommand.graphql';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { FormStyle } from '~lib/styles';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import { ChatItem } from './ChatItem';

export const AdminChatBox = () => {
  const [text, setText] = useState<string>('');
  const { loading, data } = useSubscription<{ RCON: string }>(SUBSCRIBEGQL);
  const [sendCommand] = useMutation<{}, { command: string }>(SENDCOMMANDGQL);
  const [history] = useState<string[]>([]);
  if (!loading && data && history[history.length - 1] !== data.RCON) history.push(data.RCON);

  const handleKeyPress = async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      await sendCommand({ variables: { command: text } });
      setText('')
    }
  };

  return (
    <div style={{ ...FormStyle, maxWidth: '550px' }}>
      <Typography use='headline4'>Minecraft Server Console</Typography>
      {loading ? (
        <Typography use='body1'>Loading</Typography>
      ) : (
        data && history.map((string, index) => <ChatItem key={index} message={string} />)
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

export default AdminChatBox;
