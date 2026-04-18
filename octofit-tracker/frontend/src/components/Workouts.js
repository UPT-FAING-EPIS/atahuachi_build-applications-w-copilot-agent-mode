import React from 'react';
import DataSection from './DataSection';

const Workouts = () => (
  <DataSection
    title="Workouts"
    subtitle="Personalized plans, routines and recommendations."
    endpointPath="/api/workouts/"
  />
);

export default Workouts;
