interface FeedBackValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface InputValues {
  target: number,
  hours: Array<number>
}

const parseArgumentsE = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if(isNaN(Number(args[2]))) throw new Error('Target must be number');

  const hours: number[] = [];

  for(let i = 3; i < args.length; i++) {
    if(isNaN(Number(args[i]))) {
      throw new Error('Hours must be numbers');
    } else {
      hours.push(Number(args[i]));
    }
  }
  
  return {
    target: Number(args[2]),
    hours: hours
  };
};


export const calculateExercises = (hours: Array<number>, target: number) : FeedBackValues => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / hours.length;
  const success = average >= target ? true : false;

  let rating;
  let ratingDescription;

  const diff = target - average;

  if(diff > 0.25) {
    rating = 1;
    ratingDescription = 'bad';
  } else if(diff <= 0.25 && diff > 0) {
    rating = 2;
    ratingDescription = 'decent';
  } else {
    rating = 3;
    ratingDescription = 'very good';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, hours } = parseArgumentsE(process.argv);
  const result = calculateExercises(hours, target);
  console.log(result);
} catch (e) {
  if(e instanceof Error) {
    console.log('Error: ', e.message);
  }
}