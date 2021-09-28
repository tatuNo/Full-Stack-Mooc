import React from 'react';
import { Diagnosis } from '../types';
import { useStateValue } from '../state/state';

interface DiagnoseListProps {
  diagnoseCodes: string[] | undefined;
}

const DiagnoseList = ({ diagnoseCodes }: DiagnoseListProps) => {
  const [{ diagnoses }, ] = useStateValue();

  const getDiagnose = (code: string): string => {
    const diagnoseToFind = diagnoses.find((d : Diagnosis) => d.code === code);
    return diagnoseToFind ? diagnoseToFind.name : "N/A";
  };

  if(!diagnoseCodes) {
    return null;
  }

  return(
    <div>
      <ul>
        {diagnoseCodes.map((diagnoseCode: string) => (
          <li key={diagnoseCode}>{diagnoseCode} {getDiagnose(diagnoseCode)} </li>  
        ))}
      </ul>
    </div>
  );
};

export default DiagnoseList;