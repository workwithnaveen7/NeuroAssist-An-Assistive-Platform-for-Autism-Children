import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Coffee, Utensils, GraduationCap, TowerControl as GameController, Bath, Bed, Sun, Volume2 } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { useSpeech } from '../../hooks/useSpeech';
import type { RoutineItem } from '../../types';

export const RoutinePage: React.FC = () => {
  const { speak } = useSpeech();
  
  const [routineItems, setRoutineItems] = useState<RoutineItem[]>([
    {
      id: '1',
      title: 'Wake Up & Stretch',
      icon: 'sun',
      time: '7:00 AM',
      completed: true,
      order: 1
    },
    {
      id: '2',
      title: 'Breakfast Time',
      icon: 'coffee',
      time: '7:30 AM',
      completed: true,
      order: 2
    },
    {
      id: '3',
      title: 'Learning Time',
      icon: 'graduation',
      time: '9:00 AM',
      completed: false,
      order: 3
    },
    {
      id: '4',
      title: 'Lunch Time',
      icon: 'utensils',
      time: '12:00 PM',
      completed: false,
      order: 4
    },
    {
      id: '5',
      title: 'Play Time',
      icon: 'game',
      time: '2:00 PM',
      completed: false,
      order: 5
    },
    {
      id: '6',
      title: 'Bath Time',
      icon: 'bath',
      time: '6:00 PM',
      completed: false,
      order: 6
    },
    {
      id: '7',
      title: 'Bedtime Story',
      icon: 'bed',
      time: '8:00 PM',
      completed: false,
      order: 7
    }
  ]);

  const iconMap = {
    sun: Sun,
    coffee: Coffee,
    graduation: GraduationCap,
    utensils: Utensils,
    game: GameController,
    bath: Bath,
    bed: Bed
  };

  const toggleComplete = (id: string) => {
    setRoutineItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
    
    const item = routineItems.find(item => item.id === id);
    if (item && !item.completed) {
      speak(`Great job completing ${item.title}! You're doing amazing!`);
    }
  };

  const completedCount = routineItems.filter(item => item.completed).length;
  const totalCount = routineItems.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-calm-800 mb-4">My Daily Routine</h1>
          <p className="text-lg text-calm-600 mb-6">Let's see what awesome things we'll do today!</p>
          
          {/* Progress Bar */}
          <Card className="p-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-calm-800">Progress</span>
              <span className="text-lg font-bold text-primary-600">{completedCount}/{totalCount}</span>
            </div>
            
            <div className="w-full bg-calm-200 rounded-full h-4 mb-3">
              <motion.div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-4 rounded-full flex items-center justify-end pr-2"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {progressPercentage > 20 && (
                  <span className="text-white text-xs font-bold">
                    {Math.round(progressPercentage)}%
                  </span>
                )}
              </motion.div>
            </div>
            
            {progressPercentage === 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <span className="text-2xl">🎉</span>
                <p className="text-secondary-600 font-semibold">Amazing! You completed everything!</p>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* Routine Items */}
        <div className="max-w-2xl mx-auto space-y-4">
          <AnimatePresence>
            {routineItems.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Circle;
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Card 
                    className={`p-6 transition-all duration-300 ${
                      item.completed 
                        ? 'bg-gradient-to-r from-secondary-50 to-secondary-100 border-secondary-300' 
                        : 'hover:shadow-lg'
                    }`}
                    animate={false}
                  >
                    <div className="flex items-center gap-4">
                      {/* Completion Toggle */}
                      <motion.button
                        onClick={() => toggleComplete(item.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex-shrink-0"
                      >
                        {item.completed ? (
                          <CheckCircle2 className="w-8 h-8 text-secondary-500 fill-current" />
                        ) : (
                          <Circle className="w-8 h-8 text-calm-400 hover:text-primary-500 transition-colors" />
                        )}
                      </motion.button>

                      {/* Activity Icon */}
                      <motion.div 
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          item.completed 
                            ? 'bg-secondary-200 text-secondary-700' 
                            : 'bg-primary-100 text-primary-600'
                        }`}
                        whileHover={{ rotate: 5 }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.div>

                      {/* Activity Details */}
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${
                          item.completed ? 'text-secondary-800 line-through' : 'text-calm-800'
                        }`}>
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-calm-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{item.time}</span>
                        </div>
                      </div>

                      {/* Voice Button */}
                      <Button
                        variant="calm"
                        size="sm"
                        icon={Volume2}
                        onClick={() => speak(`Next activity: ${item.title} at ${item.time}`)}
                        className="flex-shrink-0"
                      >
                        <span className="hidden sm:inline">Hear</span>
                      </Button>
                    </div>

                    {/* Completion Celebration */}
                    {item.completed && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-3 bg-secondary-100 rounded-xl text-center"
                      >
                        <span className="text-lg">⭐ Well done! ⭐</span>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Encouragement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <Card className="p-6 max-w-md mx-auto bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl mb-3"
            >
              🌟
            </motion.div>
            <h3 className="text-xl font-bold text-calm-800 mb-2">You're Doing Great!</h3>
            <p className="text-calm-600">
              Every step forward is something to be proud of. Keep going!
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};