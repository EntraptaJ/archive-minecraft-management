// UI/ui/routes/Admin/Chat.tsx
import React, { useRef, useState } from 'react';
import CHATSUBGQL from './SubRCON.graphql';
import SENDRCONGQL from './sendRCON.graphql';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import { Typography } from '@rmwc/typography';
import { FormStyle, MainStyle } from '~lib/Styles';
import '@material/typography/dist/mdc.typography.min.css';
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

    </AdminLayout>
  );
};

export default ChatRoute;
