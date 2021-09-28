import { NewBaseEntry, 
  NewPatient, 
  Gender,
  Entry, 
  NewEntry, 
  EntryType, 
  HealthCheckRating  } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isStringArray = (param: any): param is string[] => {
  return Array.isArray(param) && param.every((value) => isString(value));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error(`incorrect or missing date ${date}`);
  }

  return date;
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('incorrect or missing gender');
  }

  return gender;
};

const parseString = (param: unknown, field: string): string => {
  if(!param || !isString(param)) {
    throw new Error(`incorrect or missing ${field}`);
  }
  return param;
};

const parseType = (type: unknown): EntryType => {
  if(!type || !isEntryType(type)) {
    throw new Error('incorrect or missing type');
  }
  return type;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if(!codes || !isStringArray(codes)) {
    throw Error('incorrect or missing diagnosecodes')
  }
  return codes;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if(rating === undefined || !isHealthCheckRating(rating)) {
    throw new Error('incorrect or missing healthCheckRating');
  }
  return rating;
};

const parseBaseEntry = (description: unknown, date: unknown, specialist: unknown, type: unknown): NewBaseEntry => {
  return {
    type: parseType(type),
    description: parseString(description,"description"),
    date: parseDate(date),
    specialist: parseString(specialist,"specialist"),
  };
};


type FieldsPatient = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, occupation, gender } : FieldsPatient): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, "name"),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, "ssn"),
    occupation: parseString(occupation, "occupation"),
    gender: parseGender(gender),
    entries: Array<Entry>()
  };

  return newPatient;
};

type FieldsEntry = { description: unknown, date: unknown, type: unknown, 
specialist: unknown, diagnosisCodes?: unknown, healthCheckRating?: unknown,
discharge?: { date: unknown, criteria: unknown }, employerName?: unknown,
sickLeave?: { endDate: unknown, startDate: unknown } };

export const toNewEntry = ({ description, date, type, specialist, diagnosisCodes, healthCheckRating, discharge, employerName, sickLeave }: FieldsEntry): NewEntry => {
  const newEntry = parseBaseEntry(description, date, specialist, type) as NewEntry;
  
  if(diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  switch(newEntry.type) {
    case(EntryType.HealthCheck):
      return {
        ...newEntry,
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
        type: EntryType.HealthCheck
      };
    case(EntryType.Hospital):
      return {
        ...newEntry,
        discharge: {
          date: parseDate(discharge?.date),
          criteria: parseString(discharge?.criteria,"criteria")
        },
      };
    case(EntryType.OccupationalHealthcare):
    if(sickLeave) {
      return {
        ...newEntry,
        employerName: parseString(employerName, "employerName"),
        sickLeave: {
          endDate: parseString(sickLeave.endDate, "endDate"),
          startDate: parseString(sickLeave.startDate,"startDate"),
        }
      };
    } else {
      return {
        ...newEntry,
        employerName: parseString(employerName, "employerName")
      };  
    }
    default:
      return assertNever(newEntry);
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};