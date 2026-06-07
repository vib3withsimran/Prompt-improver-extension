import { useState, useEffect } from 'react';
import { Sparkles, History, Settings as SettingsIcon } from 'lucide-react';
import { LoginView } from './login/LoginView';
import { PopupView } from './popup/PopupView';
import { HistoryView, type HistoryItem } from './history/HistoryView';
import { SettingsView } from './settings/SettingsView';
import { supabase, signOut } from './services/supabase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>('optimize');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Monitor auth state changes and initial session
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });

    // Subscribe to auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });

    // Load local history log
    const storedHistory = localStorage.getItem('prompt_history');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    } else {
      const initialHistory: HistoryItem[] = [
        {
          id: '1',
          timestamp: '10 mins ago',
          original: 'write email to boss asking for raise',
          improved: 'Subject: Scheduling a Brief Discussion / Career Development Review\n\nDear [Manager Name],\n\nI hope you are having a productive week. I am writing to request a brief meeting to review my recent contributions and discuss my career development and compensation alignment at [Company Name]. Over the past [Timeframe], I have successfully led [Project/Metric], which resulted in [Outcome].\n\nI look forward to discussing how I can continue to drive success for the team. Please let me know your availability next week.\n\nBest regards,\n[Your Name]',
          score: 91,
          model: 'GPT-4o'
        }
      ];
      setHistory(initialHistory);
      localStorage.setItem('prompt_history', JSON.stringify(initialHistory));
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setAuthLoading(true);
      await signOut();
      setActiveTab('optimize');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAddHistory = (original: string, improved: string, score: number, model: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: 'Just now',
      original,
      improved,
      score,
      model
    };
    const updated = [newItem, ...history];
    setHistory(updated);
    localStorage.setItem('prompt_history', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('prompt_history');
  };

  const renderContent = () => {
    if (authLoading) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '12px'
        }}>
          <svg className="animate-spin" style={{ width: '28px', height: '28px', color: 'var(--primary-purple)' }} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Securing connection...</span>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <LoginView onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    switch (activeTab) {
      case 'optimize':
        return <PopupView onAddHistory={handleAddHistory} />;
      case 'history':
        return <HistoryView history={history} onClearHistory={handleClearHistory} />;
      case 'settings':
        return <SettingsView 
          onLogout={handleLogout} 
          userEmail={user?.email || 'user@example.com'} 
          userName={user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Authenticated User'}
        />;
      default:
        return <PopupView onAddHistory={handleAddHistory} />;
    }
  };

  return (
    <>
      <div style={{ flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {renderContent()}
      </div>

      {isAuthenticated && !authLoading && (
        <nav className="bottom-nav">
          <button
            onClick={() => setActiveTab('optimize')}
            className={`nav-item ${activeTab === 'optimize' ? 'active' : ''}`}
          >
            <Sparkles />
            <span>Optimize</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
          >
            <History />
            <span>History</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          >
            <SettingsIcon />
            <span>Settings</span>
          </button>
        </nav>
      )}
    </>
  );
}

export default App;
