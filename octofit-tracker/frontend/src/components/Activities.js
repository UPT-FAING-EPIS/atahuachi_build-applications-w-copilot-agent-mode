import React from 'react';
import DataSection from './DataSection';

const Activities = () => (
  <DataSection
    title="Activities"
    subtitle="Logged movement, workouts and progress history."
    endpointPath="/api/activities/"
  />
);

export default Activities;
