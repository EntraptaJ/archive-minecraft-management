import React, { createContext, useContext, ReactNode, useState } from 'react'
import { Request } from 'express'
import { globalHistory } from '@reach/router'
import { Props, setProps } from '../../Prop'

export interface PathPropsObject {
  path: string
  props: any
}

export type getProp = (req?: import('express').Request) => Promise<any>


interface PropContextType {
  props: any
  sessionProps: PathPropsObject[]
  setSTF: (prop: (req?: Request) => Promise<any>) => void
  req?: Request
}

export const PropContext = createContext<PropContextType>({
  props: Props,
  sessionProps: [],
  setSTF: () => {},
  req: undefined,
})

PropContext.displayName = 'PropContext'

interface PropProviderProps {
  children: ReactNode
  req?: Request
  props: any
  sessionProps: PathPropsObject[]
  path: string
}

export let test: Function

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const PropProvider = ({ req, children, props, sessionProps, path }: PropProviderProps) => {
  const [prop, setProp] = useState(props)

  test = (test: any) => setProp(test)

  globalHistory.listen(async (c) => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === c.location.pathname)

    if (oldProps) setProp(oldProps.props || {})
    else {
      await timeout(50)
      if (typeof (await Props) === 'undefined') return
      sessionProps.push({ path: c.location.pathname, props: (await Props) || {} })
      setProp((await Props) || {})
    }
    
  })

  return (
    <PropContext.Provider
      value={{
        sessionProps: sessionProps,
        props: prop,
        setSTF: (prop) => {
          console.log('TEST')
        },
        req,
      }}
    >
      {children}
    </PropContext.Provider>
  )
}

export const useProps = (props: (req?: Request) => Promise<any>) => {
  const { setSTF } = useContext(PropContext)
  setSTF(props)
  setProps(props)
}
