import React from 'react';
import { HospitalEntry } from '../types';
import { Icon } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import DiagnoseList from '../components/DiagnoseList';

interface Props {
  entry: HospitalEntry;
}

const HospitalEntryDetails = ({ entry }: Props) => {
  return(
    <Segment>
    <h2>{entry.date} <Icon name="ambulance" /></h2>
    <div>
        <span>{entry.description}</span>
    </div>
    <div>
      <span>Specialist: {entry.specialist}</span>
    </div>
    <div>
      <span>Discharged: {entry.discharge.date} {entry.discharge.criteria}</span>
    </div>
    <DiagnoseList diagnoseCodes={entry.diagnosisCodes} />
    </Segment>
  );
};

export default HospitalEntryDetails;