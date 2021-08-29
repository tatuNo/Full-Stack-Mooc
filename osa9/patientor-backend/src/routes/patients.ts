import express from 'express';
import patientService from '../services/patientService';
import toNewPatietEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatietEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  return patient ? res.json(patient) : res.status(404).send({error: "Patient not found"});
});

export default router;

