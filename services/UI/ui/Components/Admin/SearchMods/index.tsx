// UI/ui/Components/SearchMods/index.tsx
import { useQuery } from '@apollo/react-hooks';
import { TextField } from '@rmwc/textfield';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { FormStyle } from 'ui/lib/styles';
import { ModCard } from './ModCard';
import './SearchMods.css';
import SEARCHMODSGQL from './searchMods.graphql';

interface TwitchFile {
  fileName: string;
  downloadUrl: string;
  gameVersion: string[];
}

interface TwitchMod {
  name: string;
  id: number;
  summary: string;
  websiteUrl: string;
  authors: {
    name: string;
  }[];
  latestFiles: TwitchFile[];
}

type SearchModsType = FunctionComponent;

export const SearchModsList: SearchModsType = () => {
  const [search, setSearch] = useState('');
  const { data } = useQuery<{ searchMods: TwitchMod[] }, { search: string }>(SEARCHMODSGQL, {
    variables: {
      search,
    },
  });

  return (
    <div style={FormStyle}>
      <TextField
        label='Search Mods'
        value={search}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setSearch(target.value)}
      />
      {data && data.searchMods ? data.searchMods.map(mod => <ModCard key={mod.id} {...mod} />) : <> </>}
    </div>
  );
};
