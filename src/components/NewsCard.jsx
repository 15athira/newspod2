// src/components/NewsCard.jsx
import PropTypes from 'prop-types';


const NewsCard = ({ article }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
  <p className="text-gray-600">{article.description}</p>
  <p className="text-sm text-gray-500">{new Date(article.publishedAt).toDateString()}</p>
</div>

  );
};
NewsCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewsCard;
