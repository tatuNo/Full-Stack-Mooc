import patients from '../../data/patients';
import { Patient, NonSensitivePatient, NewPatient, NewEntry } from '../types';
import {v1 as uuid} from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
  }));
};

const getPatient = (id: string) : Patient => {
  return findPatient(id);
};

const addPatient = (patient: NewPatient) : Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};


const addEntry = (id: string, entry: NewEntry): Patient => {
  const patient = findPatient(id);
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return patient;
};

const findPatient = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id);
  if(patient) {
    return patient;
  } else {
    throw new Error("Patient not found");
  }
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry
};