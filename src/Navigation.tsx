import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { useTheme } from '../App';
import { Activity, Sun, Moon, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

type Page = 'landing' | 'predict' | 'reports' | 'about';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'landing' as Page, label: 'Home' },
    { id: 'predict' as Page, label: 'Predict Disease' },
    { id: 'reports' as Page, label: 'Reports' },
    { id: 'about' as Page, label: 'About Us' },
  ];

  const NavContent = () => (
    <>
      {navItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={currentPage === item.id ? 'default' : 'ghost'}
            onClick={() => onNavigate(item.id)}
            className="transition-all duration-200 hover:shadow-md relative overflow-hidden"
          >
            {currentPage === item.id && (
              <motion.div
                className="absolute inset-0 bg-primary rounded-md"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </Button>
        </motion.div>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Activity className="h-8 w-8 text-primary" />
          </motion.div>
          <div>
            <span className="text-xl font-semibold">HealthAI</span>
            <p className="text-xs text-muted-foreground">Your AI Health Companion</p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavContent />
        </div>

        {/* Theme Toggle & Mobile Menu */}
        <div className="flex items-center space-x-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-all duration-300 hover:shadow-lg"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}