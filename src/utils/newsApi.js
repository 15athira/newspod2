export const fetchNews = async (query) => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  };
  