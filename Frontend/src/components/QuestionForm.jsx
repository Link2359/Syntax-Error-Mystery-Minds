import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const QuestionForm = ({ onNewMessage, onEndQuestions }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      
      const response = await axios.post('http://127.0.0.1:8000/answer', {
        question, 
      });

      
      const aiResponse = response.data.answer;

      console.log(response.data)

      
      onNewMessage(question, aiResponse);

    
      setQuestion('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong. Please try again.';
      setError(errorMessage); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        required
        disabled={isLoading} 
        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-all duration-200`}
        >
          {isLoading ? 'Loading...' : 'Ask'}
        </button>

        <button
          type="button"
          onClick={onEndQuestions}
          disabled={isLoading}
          className={`bg-gray-300 text-gray-800 p-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 transition-all duration-200`}
        >
          End Questions
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>} 
    </form>
  );
};

QuestionForm.propTypes = {
  onNewMessage: PropTypes.func.isRequired,
  onEndQuestions: PropTypes.func.isRequired,
};

export default QuestionForm;
