import { useState } from 'react';

const GuessForm = () => {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const validationResult = await validateGuess(guess);
    setResult(validationResult ? 'Correct!' : 'Wrong, try again.');
  };

  const validateGuess = async (guess) => {
    
    const correctAnswer = 'Winston Churchill'; 
    return guess.toLowerCase() === correctAnswer.toLowerCase();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Guess the personality..."
        required
      />
      <button type="submit">Guess</button>
      {result && <p>{result}</p>}
    </form>
  );
};

export default GuessForm;
