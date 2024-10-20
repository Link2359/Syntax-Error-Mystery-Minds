import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import img from "../../public/sander-sammy-HoOP0nxd8eg-unsplash.jpg"; 

const HomePage = () => {
  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

 
  const handleInputChange = (e) => {
    setAccount(e.target.value); 
  };

  
  const handleLetsPlay = async () => {
    if (account) {
      setIsLoading(true); 
      try {
        
        const response = await axios.post('http://127.0.0.1:8000/', {
          account, 
        });

        if (response.status === 200) {
          navigate('/game'); 
        } else {
          throw new Error('Failed to start the game. Please try again.');
        }
      } catch (err) {
        setError({
          message: err.response?.data?.message || 'Something went wrong. Please try again.',
        });
      } finally {
        setIsLoading(false); 
      }
    } else {
      setError({ message: 'Please enter your MetaMask address to continue.' });
    }
  };

  return (
    <div className="home-container bg-gray-800 w-full h-screen flex font-sans">
      <div className='bg-gray-700 w-1/2 h-full flex flex-col justify-center items-center p-8 shadow-lg rounded-lg'>
        <h1 className='text-4xl text-white mb-6'>Welcome to Mystery Minds</h1>
        <p className='text-white text-lg mb-4 text-center'>
          Enter your MetaMask address to get started!
        </p>
        <img 
          src={img}
          alt="Mystery Minds" 
          className="w-full h-auto max-w-xs rounded-lg mb-4 shadow-md" 
        />
      </div>

      <div className="metamask-section w-1/2 h-full bg-gray-900 flex flex-col justify-center items-center gap-6 p-8 shadow-lg rounded-lg">
        <input
          type="text"
          placeholder="Enter your MetaMask address"
          value={account}
          onChange={handleInputChange}
          className="metamask-input w-full px-4 py-2 text-2xl text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
        />
        {error && <p className="error-message text-red-500">{error.message}</p>}

        
        <p className="text-white text-center text-lg mt-4">
          A fee of <span className="text-indigo-400 font-bold">2 ethers</span> will be deducted from your address to play the game.
        </p>

        <button
          onClick={handleLetsPlay}
          disabled={!account || isLoading}
          className={`play-button bg-indigo-600 text-white text-4xl px-8 rounded-lg py-2 transition duration-300 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 shadow-md`}
        >
          {isLoading ? 'Loading...' : "Let's Play"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
