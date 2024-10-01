"use client";
import { useEffect, useState } from 'react';

const UrlPostForm = () => {
  const [url, setUrl] = useState('');
  const [feedId, setFeedId] = useState('');
  const [feeds, setFeeds] = useState<{ id: string, name:string }[]>([]);
  const [type, setType] = useState('FACEBOOK'); // Default type is 'FACEBOOK'
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, isSuccess] = useState<boolean | null>(null);


  useEffect(() => {
    // Fetch feeds from the API
    fetch('/api/feeds')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an array of feed objects with an 'id' property
        setFeeds(data.body.feeds.map((feed: { id: string, name:string }) => feed));
      })
      .catch((error) => {
        console.error('Error fetching feeds:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, feedId, type }),
      });

     const data = await response.json();

      if (response.ok) {
        setMessage('Post successfully saved!');
        setUrl('');
        setFeedId('');
        setType('FACEBOOK'); // Reset to default type
        isSuccess(true)
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      isSuccess(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 m-5">
      <h2 className="text-2xl font-semibold mb-4 text-center"  >Save New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Feed ID</label>
          <select
            value={feedId}
            onChange={(e) => setFeedId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>Select a Feed ID</option>
            {feeds.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="FACEBOOK">Facebook</option>
            <option value="INSTAGRAM">Instagram</option>
            <option value="YOUTUBE">YouTube</option>
            <option value="TWITTER">Twitter</option>
            <option value="TIKTOK">TikTok</option>
            <option value="REDDIT">Reddit</option>
            <option value="TELEGRAM">Telegram</option>
            <option value="LINKEDIN">LinkedIn</option>
          </select>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
        {message && <p className={`text-center ${ success ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default UrlPostForm;
