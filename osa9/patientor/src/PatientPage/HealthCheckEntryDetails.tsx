import React from 'react';
import { HealthCheckEntry } from '../types';
import { Icon } from 'semantic-ui-react';
import { Segment } from 'semantic-ui-react';
import DiagnoseList from '../components/DiagnoseList';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
  entry: HealthCheckEntry;
}

const heartColors: {[key: number]: SemanticCOLORS} = {
  0: "green",
  1: "yellow",
  2: "orange",
  3: "red"
};

const HealthCheckEntryDetails = ({ entry }: Props)  => {
  return(
    <Segment>
      <h2>{entry.date} <Icon name="user md" /></h2>
      <div>
        <span>{entry.description}</span>
      </div>
      <div>
        <span>Specialist: {entry.specialist}</span>
      </div>
      <DiagnoseList diagnoseCodes={entry.diagnosisCodes} />
      <Icon name="heart" color={heartColors[entry.healthCheckRating]} />
    </Segment>
  );
};

export default HealthCheckEntryDetails;