// src/pages/ArticleDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { summarizeText } from '../utils/summarizer';

const ArticleDetails = ({ selectedArticle }) => {
  const { id } = useParams();
  const [article] = useState(selectedArticle || JSON.parse(localStorage.getItem("selectedArticle")));
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!article) return; // Prevent running for null values

    const getArticle = async () => {
      const summarizedText = await summarizeText(article.content);
      setSummary(summarizedText);
      setLoading(false);
    };

    getArticle();
  }, [article]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>Article not found.</div>;

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(summary);
      speechSynthesis.speak(utterance);
    } else {
      alert("Speech synthesis not supported in your browser.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="text-blue-500 mb-4 inline-block">Back to Home</Link>
      <h1 className="text-3xl font-bold my-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">By {article.author || 'Unknown'} | {article.publishedAt}</p>
      <p className="text-xl mb-4">{article.description}</p>
      
      {/* Displaying the summarized text */}
      <div className="p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Summary:</h2>
        <p>{summary}</p>
      </div>
      
      {/* Displaying "Read More" link */}
      <div className="mt-4">
        <h2 className="font-semibold">Full Article:</h2>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
          Read more
        </a>
      </div>
      
      <button onClick={handleSpeak} className="mt-4 p-2 bg-green-500 text-white rounded">🔊 Listen to Summary</button>
    </div>
  );
};

ArticleDetails.propTypes = {
  selectedArticle: PropTypes.object, // Updated to accept an object
};

export default ArticleDetails;
