import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  return patient ? res.json(patient) : res.status(404).send({error: "Patient not found"});
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, newEntry);
    res.json(updatedPatient);
  } catch(e) {
    res.status(400).send(e.message);
  }
});

export default router;

