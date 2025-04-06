import React from 'react';

interface LiveChatProps {
  streamId: string;
  messages: {
    id: string;
    username: string;
    message: string;
    timestamp: string;
    isCreator?: boolean;
    isDonation?: boolean;
    donationAmount?: number;
  }[];
  onSendMessage: (message: string) => void;
}

const LiveChat: React.FC<LiveChatProps> = ({
  streamId,
  messages,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = React.useState('');
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Live Chat</h3>
      </div>
      
      {/* Messages container */}
      <div 
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: 'calc(100vh - 250px)' }}
      >
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className={`flex items-start ${msg.isDonation ? 'bg-blue-900/30 p-2 rounded' : ''}`}>
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-xs text-white">{msg.username.charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <span className={`text-sm font-medium ${msg.isCreator ? 'text-blue-400' : 'text-gray-300'}`}>
                    {msg.username}
                  </span>
                  {msg.isDonation && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                      ${msg.donationAmount?.toFixed(2)}
                    </span>
                  )}
                  <span className="ml-2 text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="text-sm text-gray-300 mt-1">{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            No messages yet. Be the first to chat!
          </div>
        )}
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t border-gray-800">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;
