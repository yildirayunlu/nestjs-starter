import React from 'react';
import { Admin, Resource } from 'react-admin';
import crudProvider from '@fusionworks/ra-data-nest-crud';

import Users from './models/Users';

const dataProvider = crudProvider('http://localhost:3000');
const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={Users.List} create={Users.Create} edit={Users.Edit} />
  </Admin>
);

export default App;
