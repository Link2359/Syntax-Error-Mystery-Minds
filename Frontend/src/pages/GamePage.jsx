import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ChatBox from '../components/ChatBox';
import QuestionForm from '../components/QuestionForm';
import axios from 'axios';

const GamePage = () => {
  const [messages, setMessages] = useState([]);
  const [gamePhase, setGamePhase] = useState('question'); 
  const [questionCount, setQuestionCount] = useState(0); 
  const [guess, setGuess] = useState(''); 
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleNewMessage = (userMessage, aiResponse) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMessage },
      { sender: 'ai', text: aiResponse },
    ]);
    setQuestionCount((prev) => prev + 1); 
  };


  const handleEndQuestions = () => {
    setGamePhase('guess');
  };

  
  useEffect(() => {
    if (questionCount >= 10) {
      setGamePhase('guess');
    }
  }, [questionCount]);

  
  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  
  const handleGuessSubmit = async () => {
    if (!guess) {
      setError('Please enter a personality name.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      
      const response = await axios.post('http://127.0.0.1:8000/character', {
        guess,
        questionCount,
      });

      if (response.status === 200) {
        const result = response.data.answer;
        setMessages((prev) => [
          ...prev,
          { sender: 'system', text: `Your guess: "${guess}" was ${result}!` },
        ]);

        
        if (result === 'Correct') {
          alert(`Your guess: "${guess}" was ${result}! Ethers have been added to your account as a reward!`);
        } else {
          alert(`Your guess: "${guess}" was ${result}!`);
        }

        
        navigate('/');
      }
    } catch (error) {
      setError('An error occurred while submitting your guess.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Mystery Minds</h1>
        
        <div className="bg-white shadow-md rounded-lg p-4 max-w-2xl mx-auto">
          <ChatBox messages={messages} />
        </div>
      </div>

      <div className="bg-white shadow-md p-4 mt-8 border-t border-gray-200">
        {gamePhase === 'question' ? (
          <QuestionForm onNewMessage={handleNewMessage} onEndQuestions={handleEndQuestions} />
        ) : (
          <div className="guess-section max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-2">Make your guess!</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter personality name"
                value={guess}
                onChange={handleGuessChange}
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleGuessSubmit}
                disabled={isLoading}
                className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Submit Guess'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
