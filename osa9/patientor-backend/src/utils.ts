import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};


const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
    throw new Error('incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error(`incorrect or missing date ${date}`);
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('incorrect or missing ssn');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('incorrect or missing occupation');
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('incorrect or missing gender');
  }

  return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatientEntry = ({ name, dateOfBirth, ssn, occupation, gender } : Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: []
  };

  return newEntry;
};

export default toNewPatientEntry;