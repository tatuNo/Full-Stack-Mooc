import React from 'react';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalHealthcareEntryDetails from './OccupationalHealthcareEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import { Entry, EntryType } from '../types';
import { assertNever } from '../utils';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case EntryType.Hospital:
      return <HospitalEntryDetails entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case EntryType.HealthCheck:
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;