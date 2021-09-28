import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import { EntryFormValues, EntryType } from '../types';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import OccupationalEntryForm from './AddOccupationalEntryForm';
import { assertNever } from '../utils';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  formType: EntryType;
}

const AddEntry = ({ modalOpen, onClose, onSubmit, error, formType }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {(() => {
        switch(formType) {
          case EntryType.OccupationalHealthcare:
            return <OccupationalEntryForm onSubmit={onSubmit} onCancel={onClose}/>;
          case EntryType.Hospital:
            return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose}/>;
          case EntryType.HealthCheck:
            return <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose}/>;
          default:
            return assertNever(formType);
        }
      })()}
    </Modal.Content>
  </Modal>
);

export default AddEntry;