import React from 'react';
import DataSection from './DataSection';

const Users = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  return (
    <DataSection
      title="Users"
      subtitle="Athlete profiles, sign-ins and member records."
      endpoint={endpoint}
    />
  );
};

export default Users;
