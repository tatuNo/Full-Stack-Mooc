import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, EntryFormValues } from "../types";
import { useStateValue } from "../state";
import { Icon, Button, Dropdown } from "semantic-ui-react";
import { updatePatient } from "../state";
import EntryDetails from "./EntryDetails";
import { Entry, EntryType } from '../types';
import AddEntryModal from '../AddEntryModal';

const entryTypeOptions = [
  { key: "oc", text: "Occupational HealthCare", value: "OccupationalHealthcare" },
  { key: "hc", text: "Health Check", value: "HealthCheck" },
  { key: "ho", text: "Hospital", value: "Hospital" }
];

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryTypeOption, setEntryTypeOption] = React.useState<EntryType>(EntryType.Hospital);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: EntryFormValues) => {
    console.log(values);
    try {
      const { data: patient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`, values);
      dispatch(updatePatient(patient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response?.data || 'Unknown error');
    }
  };
  
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if(!Object.keys(patients[id]).includes("ssn")) {
      void fetchPatient();
    }
  }, []);

  if(!patients[id]) {
    return null;
  }

  return (
    <div>
      <h2>{patients[id].name}
        <Icon name={patients[id].gender == "male" ? "mars" : "venus"} />
      </h2>
      <div>
        ssn: {patients[id].ssn}
      </div>
      <div>
        occupation: {patients[id].occupation}
      </div>
      {patients[id].entries.map((entry : Entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal 
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        onClose={closeModal}
        error={error}
        formType={entryTypeOption}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <Dropdown placeholder="Select entry type" 
      options={entryTypeOptions}
      value={entryTypeOption}
      onChange={(_event, data) => {
        setEntryTypeOption(data.value as EntryType);
      }}
      />
    </div>
  );
};

export default PatientPage;