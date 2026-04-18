import React from 'react';
import DataSection from './DataSection';

const Activities = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  return (
    <DataSection
      title="Activities"
      subtitle="Logged movement, workouts and progress history."
      endpoint={endpoint}
    />
  );
};

export default Activities;
