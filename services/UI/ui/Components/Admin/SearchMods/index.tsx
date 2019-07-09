// UI/ui/Components/SearchMods/index.tsx
import React, { FunctionComponent, useState, ChangeEvent }  from 'react'
import { FormStyle } from '~lib/styles';
import { TextField } from '@rmwc/textfield';
import SEARCHMODSGQL from './searchMods.graphql'
import { useQuery } from '@apollo/react-hooks';
import '@material/list/dist/mdc.list.css';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import { LoadingProgress } from '~Components/Loading';
import { List, ListItem } from '@rmwc/list';
import { ModCard } from './ModCard';

interface TwitchFile {
  fileName: string
  downloadUrl: string
  gameVersion: string[]
}

interface TwitchMod {
  name: string
  id: number
  summary: string
  websiteUrl: string
  authors: {
    name: string
  }[]
  latestFiles: TwitchFile[]
}

type SearchModsType = FunctionComponent



export const SearchModsList: SearchModsType = () => {
  const [search, setSearch] = useState('')
  const { data } = useQuery<{ searchMods: TwitchMod[] }, { search: string }>(SEARCHMODSGQL, { variables: { 
    search
  }})

  return (
    <div style={FormStyle}>
      <TextField label='Search Mods' value={search} onChange={({ target }: ChangeEvent<HTMLInputElement>) => setSearch(target.value)} />
      {data && data.searchMods ? data.searchMods.map((mod) => <ModCard key={mod.id} {...mod} />) : <> </>}
    </div>
  )
}