import * as Yup from 'yup';

export const HealthCheckSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  date: Yup.date()
    .required('Required'),
  specialist: Yup.string()
    .required('Required')
});

export const OccupationalSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  date: Yup.date()
    .required('Required'),
  specialist: Yup.string()
    .required('Required'),
  employerName: Yup.string()
    .required('Required'),
  sickLeave: Yup.object({
    endDate: Yup.date(),
    startDate: Yup.date()
  })
});

export const HospitalSchema = Yup.object().shape({
  description: Yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  date: Yup.date()
    .required('Required'),
  specialist: Yup.string()
    .required('Required'),
  discharge: Yup.object({
    date: Yup.date()
      .required('Required'),
    criteria: Yup.string()
      .required('Required')
  })
});

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};