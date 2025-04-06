import React from 'react';

interface CommentSectionProps {
  contentId: string;
  comments: {
    id: string;
    username: string;
    profileImage?: string;
    text: string;
    timestamp: string;
    likes: number;
    isLiked?: boolean;
    replies?: {
      id: string;
      username: string;
      profileImage?: string;
      text: string;
      timestamp: string;
      likes: number;
      isLiked?: boolean;
    }[];
  }[];
  onAddComment: (text: string) => void;
  onAddReply: (commentId: string, text: string) => void;
  onLikeComment: (commentId: string) => void;
  onLikeReply: (commentId: string, replyId: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  contentId,
  comments,
  onAddComment,
  onAddReply,
  onLikeComment,
  onLikeReply
}) => {
  const [newComment, setNewComment] = React.useState('');
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
  const [replyText, setReplyText] = React.useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyText.trim()) {
      onAddReply(commentId, replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden p-6">
      <h3 className="text-xl font-bold text-white mb-6">Comments</h3>
      
      {/* Add comment form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-white">U</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="border-b border-gray-700 focus-within:border-blue-500">
              <textarea
                rows={3}
                className="block w-full resize-none border-0 border-transparent bg-transparent p-0 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                {comment.profileImage ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={comment.profileImage}
                    alt={comment.username}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white">{comment.username.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div>
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-white">{comment.username}</h4>
                    <span className="ml-2 text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{comment.text}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:text-gray-300"
                      onClick={() => onLikeComment(comment.id)}
                    >
                      <svg
                        className={`h-5 w-5 mr-1 ${comment.isLiked ? 'text-blue-500' : 'text-gray-500'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      {comment.likes}
                    </button>
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:text-gray-300"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <svg
                        className="h-5 w-5 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Reply
                    </button>
                  </div>
                </div>
                
                {/* Reply form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <span className="text-white text-xs">U</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="border-b border-gray-700 focus-within:border-blue-500">
                        <textarea
                          rows={2}
                          className="block w-full resize-none border-0 border-transparent bg-transparent p-0 text-white placeholder-gray-500 focus:ring-0 sm:text-sm"
                          placeholder={`Reply to ${comment.username}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end pt-2">
                        <button
                          type="button"
                          className="mr-2 inline-flex items-center px-3 py-1.5 border border-gray-700 text-xs font-medium rounded-md text-gray-400 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          onClick={() => setReplyingTo(null)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          onClick={() => handleSubmitReply(comment.id)}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-10">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          {reply.profileImage ? (
                            <img
                              className="h-8 w-8 rounded-full"
                              src={reply.profileImage}
                              alt={reply.username}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                              <span className="text-white text-xs">{reply.username.charAt(0).toUpperCase()}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <h4 className="text-sm font-medium text-white">{reply.username}</h4>
                            <span className="ml-2 text-xs text-gray-500">{reply.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{reply.text}</p>
                          <div className="mt-2">
                            <button
                              type="button"
                              className="flex items-center text-sm text-gray-500 hover:text-gray-300"
                              onClick={() => onLikeReply(comment.id, reply.id)}
                            >
                              <svg
                                className={`h-4 w-4 mr-1 ${reply.isLiked ? 'text-blue-500' : 'text-gray-500'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                              </svg>
                              {reply.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
