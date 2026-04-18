import React from 'react';
import DataSection from './DataSection';

const Users = () => (
  <DataSection
    title="Users"
    subtitle="Athlete profiles, sign-ins and member records."
    endpointPath="/api/users/"
  />
);

export default Users;
