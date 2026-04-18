import React from 'react';
import DataSection from './DataSection';

const Leaderboard = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  return (
    <DataSection
      title="Leaderboard"
      subtitle="Compare team and user performance rankings."
      endpoint={endpoint}
    />
  );
};

export default Leaderboard;
