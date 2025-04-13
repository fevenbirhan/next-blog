'use client';

import { useEffect, useState } from 'react';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  const fetchComments = async () => {
    const res = await fetch('/api/comment/get', {
      method: 'POST',
      body: JSON.stringify({ postId }),
    });

    const data = await res.json();
    setComments(Array.isArray(data) ? data : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await fetch('/api/comment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, comment: message }),
    });

    if (res.ok) {
      setMessage('');
      fetchComments();
    } else {
      console.error('Failed to post comment');
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 w-full p-3">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <textarea
          rows="3"
          className="bg-white text-black dark:bg-slate-800 dark:text-white p-2 rounded resize-none"
          placeholder="Leave a comment..."
          name="comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      {Array.isArray(comments) && comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c._id} className="border p-3 rounded bg-gray-100 dark:bg-slate-700">
              <p className="font-medium">{c.username}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{c.comment}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}