import React from 'react';
import { List as ReactAdminList, Datagrid, TextField, DateField, EditButton } from 'react-admin';

const List = (props: any) => (
  <ReactAdminList {...props}>
    <Datagrid>
      <TextField source="id" label="ID" />
      <TextField source="email" label="Email" />
      <DateField
        label="Created At"
        source="createdAt"
        showTime
        // options={{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }}
        locales="tr-TR"
      />
      <EditButton basePath="/users" />
    </Datagrid>
  </ReactAdminList>
);

export default List;
