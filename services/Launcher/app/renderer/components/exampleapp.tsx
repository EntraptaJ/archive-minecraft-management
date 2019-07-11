import * as React from 'react'
import { Link } from '@reach/router'
import { LaunchButton } from './LaunchButton'

const styles: React.CSSProperties = {
  marginTop: 100,
  textAlign: 'center'
}

export default () => {

  return (
    <div style={styles}>
    <h1>Electron + React + Parcel</h1>
    <LaunchButton />
    <h3><Link to='/'>Back</Link></h3>
  </div>
  )
}