import React from 'react';
import { motion } from 'framer-motion';
import { Baby, Users, Heart, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface HomePageProps {
  onModeSelect: (mode: 'child' | 'parent') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onModeSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-2xl"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-12 h-12 md:w-16 md:h-16 text-white fill-current" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-calm-800 mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">NeuroAssist</span>
          </h1>
          
          <p className="text-lg md:text-xl text-calm-600 max-w-2xl mx-auto mb-8">
            A safe, fun, and supportive platform designed to help children with autism spectrum disorder 
            communicate, learn, and express themselves every day.
          </p>

          <motion.div 
            className="flex items-center justify-center gap-2 text-accent-600"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Choose your experience below</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {/* Child Mode */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 text-center group" hover onClick={() => onModeSelect('child')}>
              <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Baby className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </motion.div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-calm-800 mb-4">Child Mode</h2>
              <p className="text-calm-600 mb-6 text-base md:text-lg leading-relaxed">
                Fun activities, games, and tools designed just for you! 
                Express yourself, learn new things, and earn stars along the way.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                <div className="bg-primary-50 p-3 rounded-xl">
                  <span className="text-primary-700 font-medium">🎯 Daily Routines</span>
                </div>
                <div className="bg-secondary-50 p-3 rounded-xl">
                  <span className="text-secondary-700 font-medium">🗣️ Communication</span>
                </div>
                <div className="bg-accent-50 p-3 rounded-xl">
                  <span className="text-accent-700 font-medium">🎮 Fun Games</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl">
                  <span className="text-purple-700 font-medium">😌 Calm Space</span>
                </div>
              </div>

              <Button 
                variant="primary" 
                size="lg"
                className="w-full group-hover:scale-105 transition-transform"
              >
                Let's Play & Learn!
              </Button>
            </Card>
          </motion.div>

          {/* Parent Mode */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-8 md:p-12 text-center group" hover onClick={() => onModeSelect('parent')}>
              <motion.div 
                className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-6"
                whileHover={{ scale: 1.1, rotate: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </motion.div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-calm-800 mb-4">Parent & Therapist Mode</h2>
              <p className="text-calm-600 mb-6 text-base md:text-lg leading-relaxed">
                Comprehensive tools to track progress, customize routines, 
                and support your child's unique learning journey.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                <div className="bg-secondary-50 p-3 rounded-xl">
                  <span className="text-secondary-700 font-medium">📊 Progress Tracking</span>
                </div>
                <div className="bg-primary-50 p-3 rounded-xl">
                  <span className="text-primary-700 font-medium">⚙️ Customization</span>
                </div>
                <div className="bg-accent-50 p-3 rounded-xl">
                  <span className="text-accent-700 font-medium">📝 Daily Logs</span>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl">
                  <span className="text-purple-700 font-medium">🎯 Goal Setting</span>
                </div>
              </div>

              <Button 
                variant="secondary" 
                size="lg"
                className="w-full group-hover:scale-105 transition-transform"
              >
                Access Dashboard
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Features Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-calm-800 mb-8">
            Designed with Love & Understanding
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-primary-200">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-calm-800 mb-2">Visual & Interactive</h4>
              <p className="text-sm text-calm-600">Beautiful icons, colors, and animations that engage and delight</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-secondary-200">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔊</span>
              </div>
              <h4 className="font-semibold text-calm-800 mb-2">Voice Assistance</h4>
              <p className="text-sm text-calm-600">Text-to-speech support for communication and learning</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-accent-200">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="font-semibold text-calm-800 mb-2">Positive Rewards</h4>
              <p className="text-sm text-calm-600">Encouraging achievement system that celebrates every success</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};