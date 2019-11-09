// UI/ui/lib/styles.tsx
import { CSSProperties } from 'react';

export const ContainerStyle: CSSProperties = {
  background: '#fafafa',
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '325px',
  borderRadius: '1em',
  boxShadow: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
  marginBottom: '1.5rem',
};

export const TallMainStyle: CSSProperties = {
  justifyContent: 'center',
  flex: '1 1 auto',
  display: 'flex',
  willChange: 'margin-left',
  flexDirection: 'column',
  alignItems: 'center',
};

export const MainStyle: CSSProperties = {
  justifyContent: 'center',
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  willChange: 'margin-left',
  height: 'inherit',
};

export const FormStyle: CSSProperties = {
  background: '#fafafa',
  flex: '1 1 auto',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '325px',
  borderRadius: '1em',
  padding: '1em',
  boxShadow: '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
  margin: '1.5rem',
};

export const FieldStyle: CSSProperties = { marginTop: '1em', width: '80%' };
