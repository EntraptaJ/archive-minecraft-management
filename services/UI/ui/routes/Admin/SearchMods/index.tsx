// UI/ui/routes/SearchMods/index.tsx
import React from 'react';
import { SearchModsList } from 'ui/Components/Admin/SearchMods';
import { Layout } from 'ui/Components/Layout';

const SearchModsRoute = () => {
  return (
    <Layout admin>
      <SearchModsList />
    </Layout>
  );
};

export default SearchModsRoute;
