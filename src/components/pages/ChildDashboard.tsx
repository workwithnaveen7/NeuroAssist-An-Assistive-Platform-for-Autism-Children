import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageSquare, 
  Gamepad2, 
  Waves, 
  Heart, 
  BookOpen,
  Star,
  User
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface ChildDashboardProps {
  onNavigate: (page: string) => void;
  userPoints: number;
  userName: string;
}

export const ChildDashboard: React.FC<ChildDashboardProps> = ({
  onNavigate,
  userPoints,
  userName
}) => {
  const activities = [
    {
      id: 'routine',
      title: 'My Day',
      description: 'See what\'s planned for today!',
      icon: Calendar,
      color: 'from-primary-400 to-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      id: 'communication',
      title: 'Talk & Share',
      description: 'Tell everyone how you feel',
      icon: MessageSquare,
      color: 'from-secondary-400 to-secondary-600',
      bgColor: 'bg-secondary-50'
    },
    {
      id: 'games',
      title: 'Fun Games',
      description: 'Play and learn together',
      icon: Gamepad2,
      color: 'from-accent-400 to-accent-600',
      bgColor: 'bg-accent-50'
    },
    {
      id: 'sensory',
      title: 'Calm Space',
      description: 'Relax and feel peaceful',
      icon: Waves,
      color: 'from-blue-400 to-purple-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'mood',
      title: 'How I Feel',
      description: 'Share your feelings today',
      icon: Heart,
      color: 'from-pink-400 to-red-500',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'stories',
      title: 'Story Time',
      description: 'Choose your own adventure',
      icon: BookOpen,
      color: 'from-green-400 to-teal-600',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          {/* Avatar */}
          <motion.div 
            className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-calm-800 mb-2">
            Hello, {userName}! 👋
          </h1>
          <p className="text-lg text-calm-600 mb-4">Ready for another amazing day?</p>
          
          {/* Points Display */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-accent-100 px-6 py-3 rounded-full shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-6 h-6 text-accent-600 fill-current" />
            <span className="text-xl font-bold text-accent-800">{userPoints} Stars</span>
            <Star className="w-6 h-6 text-accent-600 fill-current" />
          </motion.div>
        </motion.div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                className={`p-6 text-center ${activity.bgColor} border-2 border-transparent hover:border-opacity-50 hover:border-current`}
                hover
                onClick={() => onNavigate(activity.id)}
              >
                <motion.div 
                  className={`w-16 h-16 bg-gradient-to-br ${activity.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                >
                  <activity.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-calm-800 mb-2">{activity.title}</h3>
                <p className="text-calm-600 mb-4">{activity.description}</p>
                
                <Button 
                  variant="primary" 
                  size="md"
                  className="w-full"
                  onClick={() => onNavigate(activity.id)}
                >
                  Let's Go!
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Daily Encouragement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              ⭐
            </motion.div>
            <h3 className="text-2xl font-bold text-calm-800 mb-2">You're Doing Great!</h3>
            <p className="text-lg text-calm-600">
              Every day is a new adventure. Remember, you are amazing just the way you are! 💙
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};