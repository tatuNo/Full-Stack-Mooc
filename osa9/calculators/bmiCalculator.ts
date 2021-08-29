interface BmiValues {
  height: number,
  weight: number
}

interface BmiCalculation {
  height: number,
  weight: number,
  bmi: string
}

export const calculateBmi = (height: number, weight: number) : BmiCalculation => {
  const value = weight / ((height / 100) ** 2);
  let bmi;
  if(value < 18.5) {
    bmi = 'underweight';
  } else if(value >= 18.5 && value < 25) {
    bmi = 'normal (healty weight)';
  } else if (value >= 25 && value < 30) {
    bmi = 'overweight';
  } else {
    bmi = 'obese';
  }
  return { height, weight, bmi };
};

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  const result = calculateBmi(height, weight);
  console.log(result);
} catch (e) {
  if(e instanceof Error) {
    console.log('Error: ', e.message);
  }
} 
