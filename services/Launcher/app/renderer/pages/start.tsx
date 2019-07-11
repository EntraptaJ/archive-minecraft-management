import React, { FunctionComponent } from 'react'

import ExampleApp from '../components/exampleapp'
import { RouteComponentProps } from '@reach/router';

interface StartAppProps extends RouteComponentProps {

}

type StartAppType = FunctionComponent<StartAppProps>

export const StartApp: StartAppType = () => {
  return (<ExampleApp />)
}