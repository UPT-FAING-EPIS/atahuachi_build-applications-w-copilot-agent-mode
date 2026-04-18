import React from 'react';
import DataSection from './DataSection';

const Teams = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  return (
    <DataSection
      title="Teams"
      subtitle="Create and manage squads competing together."
      endpoint={endpoint}
    />
  );
};

export default Teams;
