import React from 'react';
import DataSection from './DataSection';

const Teams = () => (
  <DataSection
    title="Teams"
    subtitle="Create and manage squads competing together."
    endpointPath="/api/teams/"
  />
);

export default Teams;
