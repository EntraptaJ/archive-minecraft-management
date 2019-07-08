// UI/ui/Components/SearchMods/ModCard/index.tsx
import React, { FunctionComponent } from 'react';
import {
  Card,
  CardPrimaryAction,
  CardActions,
  CardActionButton,
  CardActionButtons,
  CardActionIcon,
  CardActionIcons,
} from '@rmwc/card';
import { Typography } from '@rmwc/typography';
import { useMutation } from '@apollo/react-hooks';
import DOWNLOADMODGQL from './downloadCurseMod.graphql';

import '@material/card/dist/mdc.card.css';
import '@material/button/dist/mdc.button.css';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@material/typography/dist/mdc.typography.css';

interface TwitchFile {
  fileName: string;
  downloadUrl: string;
  gameVersion: string[];
}

interface ModCardProps {
  name: string;
  websiteUrl: string;
  id: number;
  summary: string;
  authors: {
    name: string;
  }[];
  latestFiles: TwitchFile[];
}

type ModCardType = FunctionComponent<ModCardProps>;

interface DownloadModResponse {
  latestFiles: {
    gameVersion: string[];
  }[];
}

export const ModCard: ModCardType = ({ name, id, summary, authors: [{ name: authorName }], websiteUrl }) => {
  const [downloadMod] = useMutation<{ downloadCurseMod: DownloadModResponse }, { modID: number }>(DOWNLOADMODGQL, {
    variables: { modID: id },
  });
  return (
    <Card style={{ width: '21rem', marginTop: '1.5em' }}>
      <CardPrimaryAction>
        <div style={{ padding: '0 1rem 1rem 1rem' }}>
          <Typography use='headline6' tag='h2'>
            {name}
          </Typography>
          <Typography use='subtitle2' tag='h3' theme='textSecondaryOnBackground' style={{ marginTop: '-1rem' }}>
            by {authorName}
          </Typography>
          <Typography use='body1' tag='div' theme='textSecondaryOnBackground'>
            {summary}
          </Typography>
        </div>
      </CardPrimaryAction>
      <CardActions>
        <CardActionButtons>
          <CardActionButton onClick={() => downloadMod()}>Download</CardActionButton>
        </CardActionButtons>
        <CardActionIcons>
          <CardActionIcon icon='info' tag='a' href={websiteUrl} />
        </CardActionIcons>
      </CardActions>
    </Card>
  );
};
