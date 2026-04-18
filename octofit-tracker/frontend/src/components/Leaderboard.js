import React from 'react';
import DataSection from './DataSection';

const Leaderboard = () => (
  <DataSection
    title="Leaderboard"
    subtitle="Compare team and user performance rankings."
    endpointPath="/api/leaderboard/"
  />
);

export default Leaderboard;
