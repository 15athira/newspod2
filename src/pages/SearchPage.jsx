import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { fetchNews } from '../utils/newsApi';
import { summarizeText } from '../utils/summarizer';
import NewsCard from '../components/NewsCard';

const SearchPage = ({ setSelectedArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError('');
    try {
      const articles = await fetchNews(searchTerm);
      if (!articles || articles.length === 0) {
        setError('No articles found. Try a different search term.');
        setResults([]);
      } else {
        const summarizedArticles = await Promise.all(
          articles.map(async (article) => ({
            ...article,
            summary: await summarizeText(article.content || article.description)
          }))
        );
        setResults(summarizedArticles);
      }
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search for news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 text-gray-900 dark:text-white border rounded-lg 
                         bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 
                             text-gray-400 dark:text-gray-500 h-5 w-5" />
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     disabled:bg-gray-400 disabled:cursor-not-allowed
                     transition-colors duration-200"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 text-red-600 
                       dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {/* Results */}
      <div className="space-y-6">
        {results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                onClick={() => {
                  setSelectedArticle(article);
                  localStorage.setItem("selectedArticle", JSON.stringify(article));
                  window.location.href = `/article/${index}`;
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && results.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Try adjusting your search terms or browse our categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  setSelectedArticle: PropTypes.func.isRequired
};

export default SearchPage;