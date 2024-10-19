import { useState } from 'react';

const GuessForm = () => {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the guess with the backend AI
    const validationResult = await validateGuess(guess);
    setResult(validationResult ? 'Correct!' : 'Wrong, try again.');
  };

  const validateGuess = async (guess) => {
    // Simulate an API call to validate the guess with ML model
    const correctAnswer = 'Winston Churchill'; // This would come from the backend
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
