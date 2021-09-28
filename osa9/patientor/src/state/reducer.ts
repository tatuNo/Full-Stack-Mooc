import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES_LIST";
      payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
          diagnoses: state.diagnoses.concat(action.payload)
      };     
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            ...action.payload,
          }
        }
      };
    default:
      return state;
  }
};

export const setDiagnosesList = (data: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: data
  };
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data
  };
};


export const addPatient = (data: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: data
  };
};

export const updatePatient = (data: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: data
  };
};