"use client"
import { useState } from 'react';
const UrlPostForm = () => {
  const [url, setUrl] = useState(''); // State to hold the input URL
  const [message, setMessage] = useState(''); // State to display a success/error message

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // Send URL to the API
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('URL successfully saved!');
        setUrl(''); // Reset the input field after successful save
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          required
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Post
        </button>
      </form>
      {message && <p>{message}</p>} {/* Display message */}
    </div>
  );
};

export default UrlPostForm;
