// UI/ui/routes/Admin/TellRaw/index.tsx
import React from 'react'
import { Layout } from '~Components/Layout'
import { TellRawForm } from '~Components/Admin/TellRaw'

const TellRawRoute = () => {
  return (
    <Layout admin>
      <TellRawForm />
    </Layout>
  )
}

export default TellRawRoute