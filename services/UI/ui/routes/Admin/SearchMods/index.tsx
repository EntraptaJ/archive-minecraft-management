// UI/ui/routes/SearchMods/index.tsx
import React from 'react'
import { Layout } from '~Components/Layout';
import { SearchModsList } from '~Components/Admin/SearchMods';


const SearchModsRoute = () => {
  return (
    <Layout admin>
      <SearchModsList />
    </Layout>
  )
}

export default SearchModsRoute