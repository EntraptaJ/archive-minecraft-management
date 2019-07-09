// UI/ui/routes/Admin/Backups/index.tsx
import { useQuery } from '@apollo/react-hooks';
import '@material/fab/dist/mdc.fab.css';
import '@material/icon-button/dist/mdc.icon-button.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import { Fab } from '@rmwc/fab';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';
import React, { useState } from 'react';
import { BackupList } from '~Components/Admin/BackupList';
import { Layout } from '~Components/Layout';
import { FormStyle } from '~lib/styles';
import GETBACKUPSGQL from './getBackups.graphql';
import { BackupDialog } from '~Components/Admin/BackupDialog';
import { BackupSettingsDialog } from '~Components/Admin/BackupSettingsDialog';

interface Backups {
  name: string;
  folderName: string;
  date: Date;
}

const AdminBackupRoute = () => {
  const { data, refetch } = useQuery<{ getBackups: Backups[] }>(GETBACKUPSGQL);

  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [settingsDialog, setSettingsDialog] = useState<boolean>(false);

  return (
    <>
      <Layout admin>
        <div style={FormStyle}>
          <div style={{ display: 'flex', width: '100%' }}>
            <Typography
              style={{ alignSelf: 'center', position: 'absolute', left: '49%', transform: 'translateX(-50%)' }}
              use='headline4'
            >
              World Backups
            </Typography>
            <IconButton
              style={{ alignSelf: 'flex-end', marginLeft: 'auto' }}
              icon='settings'
              onClick={() => setSettingsDialog(!settingsDialog)}
            />
          </div>

          <BackupList data={data} />
          <div style={{ alignSelf: 'flex-end' }}>
            <Fab theme={['primaryBg', 'onPrimary']} icon='add' onClick={() => setConfirmDialog(!confirmDialog)} />
          </div>
        </div>
      </Layout>
      <BackupDialog refetch={refetch} open={confirmDialog} setOpen={setConfirmDialog} />
      <BackupSettingsDialog open={settingsDialog} setOpen={setSettingsDialog} />
    </>
  );
};

export default AdminBackupRoute;
