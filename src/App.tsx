import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { DiseasePrediction } from './components/DiseasePrediction';
import { Reports } from './components/Reports';
import { AboutUs } from './components/AboutUs';
import { Navigation } from './components/Navigation';

type Page = 'landing' | 'predict' | 'reports' | 'about';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const renderPage = () => {
    const pageProps = {
      initial: "initial",
      animate: "animate",
      exit: "exit",
      variants: pageVariants,
      transition: pageTransition
    };

    switch (currentPage) {
      case 'landing':
        return (
          <motion.div key="landing" {...pageProps}>
            <LandingPage onNavigate={setCurrentPage} />
          </motion.div>
        );
      case 'predict':
        return (
          <motion.div key="predict" {...pageProps}>
            <DiseasePrediction />
          </motion.div>
        );
      case 'reports':
        return (
          <motion.div key="reports" {...pageProps}>
            <Reports />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div key="about" {...pageProps}>
            <AboutUs />
          </motion.div>
        );
      default:
        return (
          <motion.div key="landing" {...pageProps}>
            <LandingPage onNavigate={setCurrentPage} />
          </motion.div>
        );
    }
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <motion.div 
        className={`min-h-screen bg-background text-foreground transition-colors duration-500 ${isDark ? 'dark' : ''}`}
        animate={{ 
          backgroundColor: isDark ? "oklch(0.145 0 0)" : "#ffffff"
        }}
        transition={{ duration: 0.5 }}
      >
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="pt-16 overflow-hidden">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>
      </motion.div>
    </ThemeContext.Provider>
  );
}