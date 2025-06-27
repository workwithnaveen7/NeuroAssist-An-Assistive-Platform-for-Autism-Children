import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { HomePage } from './components/pages/HomePage';
import { ChildDashboard } from './components/pages/ChildDashboard';
import { RoutinePage } from './components/pages/RoutinePage';
import { CommunicationPage } from './components/pages/CommunicationPage';
import { MoodPage } from './components/pages/MoodPage';
import { SensoryPage } from './components/pages/SensoryPage';

type Page = 'home' | 'child' | 'parent' | 'routine' | 'communication' | 'mood' | 'sensory' | 'games' | 'stories' | 'settings';
type Mode = 'child' | 'parent' | null;

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mode, setMode] = useState<Mode>(null);
  const [userPoints, setUserPoints] = useState(150);
  const [userName] = useState('Alex');

  const handleModeSelect = (selectedMode: Mode) => {
    setMode(selectedMode);
    if (selectedMode === 'child') {
      setCurrentPage('child');
    } else {
      setCurrentPage('parent');
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    if (page === 'home') {
      setMode(null);
    }
  };

  const addPoints = (points: number) => {
    setUserPoints(prev => prev + points);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onModeSelect={handleModeSelect} />;
      case 'child':
        return (
          <ChildDashboard 
            onNavigate={handleNavigate}
            userPoints={userPoints}
            userName={userName}
          />
        );
      case 'routine':
        return <RoutinePage />;
      case 'communication':
        return <CommunicationPage />;
      case 'mood':
        return <MoodPage />;
      case 'sensory':
        return <SensoryPage />;
      default:
        return <HomePage onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'home' && (
        <Header 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          userPoints={userPoints}
          isChildMode={mode === 'child'}
        />
      )}
      {renderCurrentPage()}
    </div>
  );
}

export default App;