// UI/ui/routes/Admin/Backups/index.tsx
import { useQuery } from '@apollo/react-hooks';
import { Fab } from '@rmwc/fab';
import { IconButton } from '@rmwc/icon-button';
import { Typography } from '@rmwc/typography';
import React, { useState } from 'react';
import { BackupDialog } from 'ui/Components/Admin/BackupDialog';
import { BackupList } from 'ui/Components/Admin/BackupList';
import { BackupSettingsDialog } from 'ui/Components/Admin/BackupSettingsDialog';
import { Layout } from 'ui/Components/Layout';
import { FormStyle } from 'ui/lib/styles';
import './Backups.css';
import GETBACKUPSGQL from './getBackups.graphql';

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
