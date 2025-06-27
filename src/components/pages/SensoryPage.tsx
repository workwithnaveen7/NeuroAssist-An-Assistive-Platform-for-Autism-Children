import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Palette, 
  Waves, 
  Sun, 
  Moon,
  Cloud,
  Zap,
  Heart
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const SensoryPage: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string>('');
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [activeTheme, setActiveTheme] = useState<string>('calm');

  const sounds = [
    { id: 'rain', name: 'Gentle Rain', icon: Cloud, description: 'Soft raindrops falling' },
    { id: 'ocean', name: 'Ocean Waves', icon: Waves, description: 'Peaceful ocean sounds' },
    { id: 'birds', name: 'Birds Chirping', icon: Sun, description: 'Happy bird songs' },
    { id: 'wind', name: 'Soft Wind', icon: Zap, description: 'Gentle breeze blowing' },
  ];

  const themes = [
    { id: 'calm', name: 'Calm Blue', colors: ['from-blue-400', 'to-blue-600'], bg: 'from-blue-50 to-blue-100' },
    { id: 'sunset', name: 'Warm Sunset', colors: ['from-orange-400', 'to-pink-500'], bg: 'from-orange-50 to-pink-100' },
    { id: 'forest', name: 'Forest Green', colors: ['from-green-400', 'to-emerald-600'], bg: 'from-green-50 to-emerald-100' },
    { id: 'lavender', name: 'Soft Lavender', colors: ['from-purple-400', 'to-purple-600'], bg: 'from-purple-50 to-purple-100' },
  ];

  // Generate bubbles for interactive bubble pop
  const generateBubbles = () => {
    const newBubbles = [];
    for (let i = 0; i < 10; i++) {
      newBubbles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20
      });
    }
    setBubbles(newBubbles);
  };

  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
  };

  useEffect(() => {
    generateBubbles();
    const interval = setInterval(generateBubbles, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTheme = themes.find(t => t.id === activeTheme) || themes[0];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.bg} py-8 transition-all duration-1000`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-calm-800 mb-4">Calm & Sensory Space</h1>
          <p className="text-lg text-calm-600">Take a deep breath and find your peaceful moment here</p>
        </motion.div>

        {/* Theme Selector */}
        <Card className="p-6 mb-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-calm-800 mb-4 text-center">Choose Your Calm Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => setActiveTheme(theme.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  activeTheme === theme.id 
                    ? 'border-calm-800 shadow-lg' 
                    : 'border-calm-200 hover:border-calm-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${theme.colors[0]} ${theme.colors[1]} rounded-full mx-auto mb-2`} />
                <span className="text-sm font-medium text-calm-800">{theme.name}</span>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Sound Controls */}
        <Card className="p-6 mb-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-calm-800 mb-4 text-center">Calming Sounds</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sounds.map((sound) => (
              <motion.div key={sound.id}>
                <Button
                  variant={activeSound === sound.id ? 'primary' : 'calm'}
                  size="lg"
                  icon={sound.icon}
                  onClick={() => setActiveSound(activeSound === sound.id ? '' : sound.id)}
                  className="w-full h-auto flex-col py-4"
                >
                  <span className="text-sm font-medium">{sound.name}</span>
                  <span className="text-xs opacity-75">{sound.description}</span>
                </Button>
              </motion.div>
            ))}
          </div>
          
          {activeSound && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-primary-600">
                <Volume2 className="w-5 h-5" />
                <span className="text-sm">Playing: {sounds.find(s => s.id === activeSound)?.name}</span>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Interactive Activities */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Bubble Pop Game */}
          <Card className="p-6 relative overflow-hidden" style={{ minHeight: '400px' }}>
            <h3 className="text-xl font-bold text-calm-800 mb-4 text-center">Pop the Bubbles</h3>
            <p className="text-calm-600 text-center mb-4">Tap the bubbles to pop them and feel calm</p>
            
            <div className="relative w-full h-64 bg-gradient-to-b from-transparent to-blue-100 rounded-xl overflow-hidden">
              <AnimatePresence>
                {bubbles.map((bubble) => (
                  <motion.div
                    key={bubble.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: 0.7, 
                      scale: 1,
                      y: [0, -20, 0],
                    }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ 
                      duration: 3,
                      y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${bubble.x}%`,
                      top: `${bubble.y}%`,
                      width: `${bubble.size}px`,
                      height: `${bubble.size}px`,
                    }}
                    onClick={() => popBubble(bubble.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <div 
                      className={`w-full h-full bg-gradient-to-br ${currentTheme.colors[0]} ${currentTheme.colors[1]} rounded-full border-2 border-white/30 shadow-lg`}
                      style={{
                        background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent 50%), 
                                   linear-gradient(135deg, rgba(255,255,255,0.3), transparent)`
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <Button
              variant="primary"
              size="md"
              onClick={generateBubbles}
              className="w-full mt-4"
            >
              Make More Bubbles!
            </Button>
          </Card>

          {/* Breathing Exercise */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-calm-800 mb-4 text-center">Breathing Circle</h3>
            <p className="text-calm-600 text-center mb-6">Watch the circle and breathe with it</p>
            
            <div className="flex items-center justify-center mb-6">
              <motion.div
                className={`w-32 h-32 bg-gradient-to-br ${currentTheme.colors[0]} ${currentTheme.colors[1]} rounded-full flex items-center justify-center shadow-2xl`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
            </div>
            
            <div className="text-center space-y-4">
              <motion.p 
                className="text-lg font-medium text-calm-700"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Breathe in... and breathe out...
              </motion.p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                  <span className="text-green-700 font-medium">Breathe In: 2 seconds</span>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                  <span className="text-blue-700 font-medium">Breathe Out: 2 seconds</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Encouragement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              🌸
            </motion.div>
            <h3 className="text-2xl font-bold text-calm-800 mb-3">You're Doing Great</h3>
            <p className="text-lg text-calm-600 leading-relaxed">
              Taking time to calm yourself is wonderful. You're learning important skills 
              to help you feel peaceful and happy. Keep being amazing! 🌟
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};