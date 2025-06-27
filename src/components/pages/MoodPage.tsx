import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Save, Volume2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useSpeech } from '../../hooks/useSpeech';
import type { MoodEntry } from '../../types';

export const MoodPage: React.FC = () => {
  const { speak } = useSpeech();
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const moods = [
    { id: 'amazing', emoji: '😊', label: 'Amazing', color: 'from-green-400 to-green-600', description: 'I feel fantastic today!' },
    { id: 'happy', emoji: '😄', label: 'Happy', color: 'from-yellow-400 to-yellow-600', description: 'I feel really good!' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: 'from-blue-400 to-blue-600', description: 'I feel alright today.' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-purple-400 to-purple-600', description: 'I feel a bit down.' },
    { id: 'angry', emoji: '😠', label: 'Angry', color: 'from-red-400 to-red-600', description: 'I feel frustrated or upset.' },
    { id: 'worried', emoji: '😰', label: 'Worried', color: 'from-orange-400 to-orange-600', description: 'I feel anxious or nervous.' },
    { id: 'excited', emoji: '🤩', label: 'Excited', color: 'from-pink-400 to-pink-600', description: 'I feel super energetic!' },
    { id: 'calm', emoji: '😌', label: 'Calm', color: 'from-teal-400 to-teal-600', description: 'I feel peaceful and relaxed.' },
  ];

  const saveMood = () => {
    if (!selectedMood) return;
    
    const mood = moods.find(m => m.id === selectedMood);
    if (mood) {
      speak(`Thank you for sharing that you feel ${mood.label} today. Your feelings are important!`);
      setShowSuccessMessage(true);
      
      setTimeout(() => {
        setShowSuccessMessage(false);
        setSelectedMood('');
        setNotes('');
      }, 3000);
    }
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
          <h1 className="text-4xl font-bold text-calm-800 mb-4">How I Feel Today</h1>
          <p className="text-lg text-calm-600">It's important to share your feelings. Pick the one that matches how you feel right now!</p>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-calm-500">
            <Calendar className="w-5 h-5" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccessMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
            >
              <Card className="p-6 bg-secondary-100 border-secondary-300 shadow-xl">
                <div className="text-center">
                  <div className="text-4xl mb-2">🌟</div>
                  <h3 className="text-xl font-bold text-secondary-800 mb-2">Thank you for sharing!</h3>
                  <p className="text-secondary-700">Your feelings matter and you're doing great!</p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mood Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
          {moods.map((mood, index) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`p-6 text-center cursor-pointer transition-all duration-300 ${
                  selectedMood === mood.id 
                    ? 'ring-4 ring-primary-400 bg-primary-50 border-primary-300' 
                    : 'hover:shadow-xl'
                }`}
                hover
                onClick={() => {
                  setSelectedMood(mood.id);
                  speak(mood.description);
                }}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${mood.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg text-3xl`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mood.emoji}
                </motion.div>
                
                <h3 className="text-lg font-bold text-calm-800 mb-1">{mood.label}</h3>
                <p className="text-sm text-calm-600">{mood.description}</p>
                
                {selectedMood === mood.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-2"
                  >
                    <div className="w-6 h-6 bg-primary-500 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Selected Mood Details */}
        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-calm-800 mb-4 text-center">
                  Tell us more about feeling {moods.find(m => m.id === selectedMood)?.label.toLowerCase()}
                </h2>
                
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="You can write or draw here about why you feel this way... (This is optional!)"
                  className="w-full h-32 p-4 border-2 border-calm-200 rounded-xl resize-none focus:border-primary-400 focus:outline-none text-calm-800 placeholder-calm-500"
                />
                
                <div className="flex gap-4 justify-center mt-6">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Save}
                    onClick={saveMood}
                  >
                    Save My Feelings
                  </Button>
                  
                  <Button
                    variant="calm"
                    size="lg"
                    icon={Volume2}
                    onClick={() => {
                      const mood = moods.find(m => m.id === selectedMood);
                      if (mood) speak(mood.description);
                    }}
                  >
                    Hear Again
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Encouragement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-4xl mb-4"
            >
              💝
            </motion.div>
            <h3 className="text-2xl font-bold text-calm-800 mb-3">All Feelings Are Okay</h3>
            <p className="text-lg text-calm-600 leading-relaxed">
              Whether you feel happy, sad, excited, or worried - every feeling is important and valid. 
              Thank you for being brave and sharing with us! 💙
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};