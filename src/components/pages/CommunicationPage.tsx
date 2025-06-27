import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  RotateCcw, 
  Heart, 
  Coffee, 
  Utensils, 
  Gamepad2,
  Home,
  User,
  HelpCircle,
  Smile,
  Frown,
  Angry,
  Meh,
  Zap
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useSpeech } from '../../hooks/useSpeech';
import type { CommunicationSymbol } from '../../types';

export const CommunicationPage: React.FC = () => {
  const { speak } = useSpeech();
  const [selectedSymbols, setSelectedSymbols] = useState<CommunicationSymbol[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('emotions');

  const symbols: Record<string, CommunicationSymbol[]> = {
    emotions: [
      { id: '1', text: 'happy', icon: 'smile', category: 'emotions' },
      { id: '2', text: 'sad', icon: 'frown', category: 'emotions' },
      { id: '3', text: 'angry', icon: 'angry', category: 'emotions' },
      { id: '4', text: 'okay', icon: 'meh', category: 'emotions' },
      { id: '5', text: 'excited', icon: 'zap', category: 'emotions' },
      { id: '6', text: 'love', icon: 'heart', category: 'emotions' },
    ],
    needs: [
      { id: '7', text: 'water', icon: 'coffee', category: 'needs' },
      { id: '8', text: 'food', icon: 'utensils', category: 'needs' },
      { id: '9', text: 'bathroom', icon: 'home', category: 'needs' },
      { id: '10', text: 'help', icon: 'help-circle', category: 'needs' },
      { id: '11', text: 'break', icon: 'user', category: 'needs' },
    ],
    actions: [
      { id: '12', text: 'play', icon: 'gamepad2', category: 'actions' },
      { id: '13', text: 'go', icon: 'home', category: 'actions' },
      { id: '14', text: 'stop', icon: 'user', category: 'actions' },
      { id: '15', text: 'more', icon: 'zap', category: 'actions' },
      { id: '16', text: 'finished', icon: 'smile', category: 'actions' },
    ]
  };

  const iconMap = {
    smile: Smile,
    frown: Frown,
    angry: Angry,
    meh: Meh,
    zap: Zap,
    heart: Heart,
    coffee: Coffee,
    utensils: Utensils,
    home: Home,
    'help-circle': HelpCircle,
    user: User,
    gamepad2: Gamepad2
  };

  const categories = [
    { id: 'emotions', name: 'How I Feel', color: 'from-pink-400 to-red-500', bgColor: 'bg-pink-50' },
    { id: 'needs', name: 'I Need', color: 'from-blue-400 to-blue-600', bgColor: 'bg-blue-50' },
    { id: 'actions', name: 'I Want To', color: 'from-green-400 to-green-600', bgColor: 'bg-green-50' }
  ];

  const addSymbol = (symbol: CommunicationSymbol) => {
    setSelectedSymbols(prev => [...prev, symbol]);
  };

  const speakSentence = () => {
    if (selectedSymbols.length === 0) return;
    
    const sentence = selectedSymbols.map(s => s.text).join(' ');
    speak(`I am ${sentence}`, { rate: 0.7, pitch: 1.3 });
  };

  const clearSentence = () => {
    setSelectedSymbols([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-calm-800 mb-4">Talk & Share</h1>
          <p className="text-lg text-calm-600">Choose pictures to tell everyone how you feel and what you need!</p>
        </motion.div>

        {/* Sentence Builder */}
        <Card className="p-6 mb-8 max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-calm-800 mb-4 text-center">My Message</h2>
          
          {/* Selected Symbols Display */}
          <div className="min-h-[100px] bg-calm-50 rounded-2xl p-4 mb-4 border-2 border-dashed border-calm-300">
            {selectedSymbols.length === 0 ? (
              <div className="flex items-center justify-center h-full text-calm-500">
                <p className="text-lg">Tap pictures below to build your message!</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3 items-center justify-center">
                <span className="text-lg font-medium text-calm-700">I am</span>
                <AnimatePresence>
                  {selectedSymbols.map((symbol, index) => {
                    const IconComponent = iconMap[symbol.icon as keyof typeof iconMap] || Smile;
                    return (
                      <motion.div
                        key={`${symbol.id}-${index}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-primary-200"
                      >
                        <IconComponent className="w-5 h-5 text-primary-600" />
                        <span className="text-lg font-medium text-calm-800">{symbol.text}</span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={Volume2}
              onClick={speakSentence}
              disabled={selectedSymbols.length === 0}
            >
              Say It Out Loud!
            </Button>
            
            <Button
              variant="calm"
              size="lg"
              icon={RotateCcw}
              onClick={clearSentence}
              disabled={selectedSymbols.length === 0}
            >
              Start Over
            </Button>
          </div>
        </Card>

        {/* Category Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-2xl p-2 shadow-lg border border-calm-200">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'primary' : 'calm'}
                size="md"
                onClick={() => setActiveCategory(category.id)}
                className="mx-1"
                animate={false}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Symbol Grid */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {symbols[activeCategory]?.map((symbol, index) => {
            const IconComponent = iconMap[symbol.icon as keyof typeof iconMap] || Smile;
            const categoryData = categories.find(c => c.id === activeCategory);
            
            return (
              <motion.div
                key={symbol.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`p-6 text-center cursor-pointer ${categoryData?.bgColor} border-2 border-transparent hover:border-current hover:shadow-xl transition-all duration-200`}
                  hover
                  onClick={() => addSymbol(symbol)}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${categoryData?.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-lg font-bold text-calm-800 capitalize">{symbol.text}</h3>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="p-6 max-w-2xl mx-auto bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200">
            <h3 className="text-xl font-bold text-calm-800 mb-3">How to Use</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                <p className="text-calm-700">Pick a feeling or need</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                <p className="text-calm-700">Build your message</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                <p className="text-calm-700">Say it out loud!</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};