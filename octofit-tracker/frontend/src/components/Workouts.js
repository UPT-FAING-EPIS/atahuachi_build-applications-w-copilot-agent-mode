import React from 'react';
import DataSection from './DataSection';

const Workouts = () => {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  return (
    <DataSection
      title="Workouts"
      subtitle="Personalized plans, routines and recommendations."
      endpoint={endpoint}
    />
  );
};

export default Workouts;
