import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'; // Import axios for making requests

const QuestionForm = ({ onNewMessage, onEndQuestions }) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track if the request is being processed
  const [error, setError] = useState(null); // Track any errors

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError(null);
    setIsLoading(true);

    try {
      // Make the POST request to the backend with the user's question
      const response = await axios.post('http://127.0.0.1:8000/answer', {
        question, // Send the user's question in the request body
      });

      // Extract the AI response from the backend response
      const aiResponse = response.data.answer;

      console.log(response.data)

      // Call the onNewMessage callback to add the question and AI response to the chat
      onNewMessage(question, aiResponse);

      // Clear the input field
      setQuestion('');
    } catch (err) {
      // Handle any errors that occur during the request
      // Extract a message from the error object
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong. Please try again.';
      setError(errorMessage); // Set the extracted message as the error
    } finally {
      // Stop the loading state
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
        disabled={isLoading} // Disable input while request is being processed
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

      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message if there's an error */}
    </form>
  );
};

QuestionForm.propTypes = {
  onNewMessage: PropTypes.func.isRequired,
  onEndQuestions: PropTypes.func.isRequired,
};

export default QuestionForm;
