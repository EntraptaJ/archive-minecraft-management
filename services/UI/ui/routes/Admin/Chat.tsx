// UI/ui/routes/Admin/Chat.tsx
import React, { useRef, useState } from 'react';
import CHATSUBGQL from './SubRCON.graphql';
import SENDRCONGQL from './sendRCON.graphql';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { Typography } from '@rmwc/typography';
import { FormStyle, MainStyle } from '~lib/Styles';
import '@material/typography/dist/mdc.typography.min.css';
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import 'antd/dist/antd.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import { TextField } from '@rmwc/textfield';
import { AdminLayout } from '~Components/Admin/Layout';

interface MessageItemProps {
  text: string;
}

type MessageItemType = React.FunctionComponent<MessageItemProps>;

const MessageItem: MessageItemType = ({ text }) => {
  return <Comment author={<a>Server</a>} content={<p>{text}</p>} />;
};

const ChatRoute = () => {
  const [text, setText] = useState<string>('');
  const [sendText] = useMutation<{}, { command: string }>(SENDRCONGQL);
  const { data, loading } = useSubscription<{ Chats: string }>(CHATSUBGQL);
  const [test] = useState<string[]>([]);
  if (!loading && data && test[test.length - 1] !== data.Chats) test.push(data.Chats);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') sendText({ variables: { command: text } });
  };

  return (
    <AdminLayout>
      <div style={{ ...FormStyle, maxWidth: '400px' }}>
        <Typography use='headline4'>Minecraft Server</Typography>
        {loading ? (
          <Typography use='body1'>Loading</Typography>
        ) : (
          data && <div style={{ overflowY: 'scroll' }}>{test.map((string, index) => <MessageItem key={index} text={string} />)}</div>
        )}
        <TextField
          label='Send Command'
          outlined
          onKeyPress={handleKeyPress}
          onChange={({ target }: React.ChangeEvent<HTMLInputElement>) => setText(target.value)}
          value={text}
        />
      </div>
    </AdminLayout>
  );
};

export default ChatRoute;
