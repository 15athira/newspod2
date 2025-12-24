import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Newspaper, Menu, X, Sun, Moon } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Import from your components
import Home from './pages/Home';
import ArticleDetails from './pages/ArticleDetails';
import SearchPage from './pages/SearchPage';

const queryClient = new QueryClient();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
   
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a 
                    href="/" 
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Home
                  </a>
                  <a 
                    href="/search" 
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    Search
                  </a>
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5 text-gray-200" />
                    ) : (
                      <Moon className="h-5 w-5 text-gray-700" />
                    )}
                  </button>
                </nav>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
                <div className="container mx-auto px-4 py-2 space-y-2">
                  <a 
                    href="/" 
                    className="block p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Home
                  </a>
                  <a 
                    href="/search" 
                    className="block p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Search
                  </a>
                </div>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <div className="space-y-8">
                    
                    <Home setSelectedArticle={setSelectedArticle} />
                  </div>
                } 
              />
              <Route 
                path="/article/:id" 
                element={<ArticleDetails selectedArticle={selectedArticle} />} 
              />
              <Route 
                path="/search" 
                element={
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Search News
                      </h1>
                      <p className="text-xl text-gray-600 dark:text-gray-300">
                        Find and summarize news articles on any topic
                      </p>
                    </div>
                    <SearchPage setSelectedArticle={setSelectedArticle} />
                  </div>
                } 
              />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 shadow-inner mt-16">
            <div className="container mx-auto px-4 py-8">
              
            </div>
          </footer>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;