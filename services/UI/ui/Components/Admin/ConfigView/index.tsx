// UI/ui/Components/Admin/ConfigView/index.tsx
import React, { useState, FunctionComponent, ChangeEvent } from 'react';
import { useQuery } from '@apollo/react-hooks';
import GETCONFIGGQL from './getConfig.graphql';
import { LoadingProgress } from '~Components/Loading';
import { FormStyle } from '~routes/Home/Styles';
import { Typography } from '@rmwc/typography';
import { TextField } from '@rmwc/textfield';
import '@material/textfield/dist/mdc.textfield.min.css';
import '@material/floating-label/dist/mdc.floating-label.min.css';
import '@material/notched-outline/dist/mdc.notched-outline.min.css';
import '@material/line-ripple/dist/mdc.line-ripple.min.css';
import '@material/switch/dist/mdc.switch.min.css';
import '@material/form-field/dist/mdc.form-field.min.css';
import { Switch } from '@rmwc/switch';

interface FieldBooleanType {
  type: 'Boolean';
  value: boolean;
  label: string;
  comment?: string
}

interface FieldStringType {
  type: 'String';
  value: string;
  label: string;
  comment?: string
}

interface FieldNumbertype {
  type: 'Number';
  value: number;
  label: string;
  comment?: string
}

type FieldArrayType = FieldBooleanType | FieldStringType | FieldNumbertype;

type FieldType = FunctionComponent<FieldArrayType>;

const Field: FieldType = ({ label, value, type, comment }) => {
  const [state, setState] = useState<typeof value>(value);
  if (type === 'Boolean')
    return (
      <>
        <Typography style={{ marginTop: '1em' }} use='subtitle1'>
          {comment}
        </Typography>
        <Switch style={{ width: '100%' }} checked={state as boolean} onChange={() => setState(!state)} label={label} />
      </>
    );
  if (type === 'String')
    return (
      <TextField
        outlined
        style={{ marginTop: '1em', width: '100%' }}
        value={state as string}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => setState(target.value)}
        label={label}
      />
    );
  return (
    <TextField
      outlined
      style={{ marginTop: '1em', width: '100%' }}
      value={state as number}
      onChange={({ target }: ChangeEvent<HTMLInputElement>) => setState(target.value)}
      type='number'
      label={label}
    />
  );
};

const Fields: { [section: string]: FieldArrayType[] } = {};

export const AdminModConfigView = () => {
  const { data, loading } = useQuery<{ getConfig: string }>(GETCONFIGGQL);
  if (loading) return <LoadingProgress />;
  if (data)
    Object.entries(JSON.parse(data.getConfig)).map(([section, values]) => {
      Fields[section] = [];
      Object.entries(values as Object).map(([label, { value, comment }]) => {
        if (typeof value === 'number') Fields[section].push({ type: 'Number', label, value, comment });
        if (typeof value === 'boolean') Fields[section].push({ type: 'Boolean', label, value, comment });
        else console.log(typeof value);
      });
    });

  return (
    <div style={{ ...FormStyle, marginTop: '2em', marginBottom: '2em' }}>
      <Typography use='headline4'>Configure Mod</Typography>
      {Object.entries(Fields).map(([section, test]) => (
        <>
          <Typography use='headline4'>{section}</Typography>
          {test.map(stuff => (
            <Field {...stuff} />
          ))}
        </>
      ))}
    </div>
  );
};
