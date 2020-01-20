import React from 'react';
import { required, Edit as ReactAdminEdit, SimpleForm, TextInput } from 'react-admin';

const Edit = (props: any) => (
  <ReactAdminEdit undoable={false} {...props}>
    <SimpleForm>
      <TextInput variant="outlined" fullWidth source="email" validate={[required()]} />
      <TextInput variant="outlined" fullWidth source="password" validate={[required()]} />
    </SimpleForm>
  </ReactAdminEdit>
);

export default Edit;
