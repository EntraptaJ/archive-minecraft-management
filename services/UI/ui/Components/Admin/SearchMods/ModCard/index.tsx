// UI/ui/Components/SearchMods/ModCard/index.tsx
import { useMutation } from '@apollo/react-hooks';
import '@material/button/dist/mdc.button.min.css';
import '@material/card/dist/mdc.card.min.css';
import '@material/dialog/dist/mdc.dialog.min.css';
import '@material/icon-button/dist/mdc.icon-button.min.css';
import '@material/snackbar/dist/mdc.snackbar.min.css';
import '@material/typography/dist/mdc.typography.min.css';
import {
  Card,
  CardActionButton,
  CardActionButtons,
  CardActionIcon,
  CardActionIcons,
  CardActions,
  CardPrimaryAction,
} from '@rmwc/card';
import { Snackbar, SnackbarAction } from '@rmwc/snackbar';
import { CircularProgress } from '@rmwc/circular-progress';
import '@rmwc/circular-progress/circular-progress.css';
import { Dialog, DialogActions, DialogButton, DialogContent, DialogTitle } from '@rmwc/dialog';
import { Typography } from '@rmwc/typography';
import React, { FunctionComponent, useState } from 'react';
import DOWNLOADMODGQL from './downloadCurseMod.graphql';

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
  const [downloadMod, { loading }] = useMutation<{ downloadCurseMod: DownloadModResponse }, { modID: number }>(DOWNLOADMODGQL, {
    variables: { modID: id },
  });
  const [dialog, setDialog] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  return (
    <>
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
            <CardActionButton onClick={() => setDialog(true)}>Download</CardActionButton>
          </CardActionButtons>
          <CardActionIcons>
            <CardActionIcon icon='info' tag='a' href={websiteUrl} />
          </CardActionIcons>
        </CardActions>
      </Card>
      <Dialog
        open={dialog}
        onClose={async evt => {
          if (evt.detail.action === 'confirm') await downloadMod();
          await setDialog(false);
          await setFinished(true)

        }}
      >
        <DialogTitle>Download {name}</DialogTitle>
        <DialogContent>Are you sure you want to install {name}?</DialogContent>
        <DialogActions>
          <DialogButton action='close'>Cancel</DialogButton>
          <DialogButton action='confirm' isDefaultAction icon={loading && <CircularProgress />}>
            Install Mod
          </DialogButton>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={finished}
        onClose={evt => setFinished(false)}
        message={`Finished Installing ${name}`}
        action={<SnackbarAction label='Dismiss' onClick={() => console.log('Click Me')} />}
      />
    </>
  );
};
