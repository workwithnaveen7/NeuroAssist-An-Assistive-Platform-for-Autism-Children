import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Settings, Star } from 'lucide-react';
import { Button } from '../common/Button';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userPoints?: number;
  isChildMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  userPoints = 0,
  isChildMode = true
}) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg border-b-4 border-primary-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">N</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl md:text-2xl font-bold text-calm-800">NeuroAssist</h1>
              {isChildMode && <p className="text-sm text-calm-600">Your Helper Friend</p>}
            </div>
          </div>

          {/* Points Display (Child Mode) */}
          {isChildMode && (
            <motion.div 
              className="flex items-center gap-2 bg-accent-100 px-4 py-2 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-5 h-5 text-accent-600 fill-current" />
              <span className="font-bold text-accent-800">{userPoints}</span>
            </motion.div>
          )}

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Button
              variant={currentPage === 'home' ? 'primary' : 'calm'}
              size="sm"
              icon={Home}
              onClick={() => onNavigate('home')}
              animate={false}
            >
              <span className="hidden sm:inline">Home</span>
            </Button>
            
            {!isChildMode && (
              <>
                <Button
                  variant={currentPage === 'parent' ? 'primary' : 'calm'}
                  size="sm"
                  icon={User}
                  onClick={() => onNavigate('parent')}
                  animate={false}
                >
                  <span className="hidden sm:inline">Parent</span>
                </Button>
                
                <Button
                  variant={currentPage === 'settings' ? 'primary' : 'calm'}
                  size="sm"
                  icon={Settings}
                  onClick={() => onNavigate('settings')}
                  animate={false}
                >
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};