import PropTypes from 'prop-types'


const ChatBox = ({ messages }) => {
  return (
    <div className="h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-lg">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 p-2 rounded-lg ${
            message.sender === 'user' ? 'bg-indigo-100 self-end text-right' : 'bg-gray-200 self-start'
          }`}
        >
          <p>{message.text}</p>
        </div>
      ))}
    </div>
  );
};


ChatBox.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.oneOf(['user', 'ai', 'system']).isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};




export default ChatBox;