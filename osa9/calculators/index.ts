import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  if(isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)) || !req.query.height || !req.query.weight) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  const result = calculateBmi(Number(req.query.height), Number(req.query.weight));
  
  res.json(result);
});

app.post('/exercises', (req, res) => {
  if(!req.body.daily_exercises || !req.body.target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req.body.daily_exercises.forEach((element: any) => {
    if(isNaN(Number(element)))
      res.status(400).send({ error: 'malformatted parameters' });
  });

  if(isNaN(Number(req.body.target))) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(req.body.daily_exercises, req.body.target);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

