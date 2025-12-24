// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { fetchNews } from '../utils/newsApi';
import NewsCard from '../components/NewsCard';
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; 

const Home = ({ setSelectedArticle }) => {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getArticles = async () => {
      const fetchedArticles = await fetchNews("technology"); // Default category
      setArticles(fetchedArticles);
    };
    getArticles();
  }, []);

  const handleClick = (article, index) => {
    setSelectedArticle(article);
    localStorage.setItem("selectedArticle", JSON.stringify(article)); // Store in localStorage
    navigate(`/article/${index}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Summarizer</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(articles || []).map((article, index) => (
          <div key={index} onClick={() => handleClick(article, index)}>
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  setSelectedArticle: PropTypes.func.isRequired,
};

export default Home;
