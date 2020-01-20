import React from 'react';
import { required, Create as ReactAdminCreate, SimpleForm, TextInput } from 'react-admin';

const Create = (props: any) => (
  <ReactAdminCreate {...props}>
    <SimpleForm>
      <TextInput variant="outlined" fullWidth source="email" validate={[required()]} />
      <TextInput variant="outlined" fullWidth source="password" validate={[required()]} />
    </SimpleForm>
  </ReactAdminCreate>
);

export default Create;
