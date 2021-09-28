import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Icon } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import DiagnoseList from '../components/DiagnoseList';

interface Props {
  entry: OccupationalHealthcareEntry; 
}

const OccupationalHealthcareEntryDetails = ({ entry }: Props) => {
  return(
    <Segment>
    <h2>{entry.date} <Icon name="stethoscope" /></h2>
    <div>
      <span>{entry.description}</span>
    </div>
    <div>
      <span>Specialist: {entry.specialist}</span>
    </div>
    <div>
      <span>Employer: {entry.employerName}</span>
    </div>
    <div>    
      { entry.sickLeave ?
      <span>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</span>
      : null
      }
    </div>
    <DiagnoseList diagnoseCodes={entry.diagnosisCodes} />
    </Segment>
  );
};

export default OccupationalHealthcareEntryDetails;
