import { useState, useEffect } from 'react';
import { Sparkles, History, Settings as SettingsIcon } from 'lucide-react';
import { LoginView } from './login/LoginView';
import { PopupView } from './popup/PopupView';
import { HistoryView, type HistoryItem } from './history/HistoryView';
import { SettingsView } from './settings/SettingsView';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('optimize');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load state and history on mount
  useEffect(() => {
    // Check localStorage for mock auth state and history
    const storedAuth = localStorage.getItem('mock_auth');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }

    const storedHistory = localStorage.getItem('prompt_history');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error('Failed to parse history', e);
      }
    } else {
      // Mock history placeholder
      const initialHistory: HistoryItem[] = [
        {
          id: '1',
          timestamp: '10 mins ago',
          original: 'write email to boss asking for raise',
          improved: 'Subject: Scheduling a Brief Discussion / Career Development Review\n\nDear [Manager Name],\n\nI hope you are having a productive week. I am writing to request a brief meeting to review my recent contributions and discuss my career development and compensation alignment at [Company Name]. Over the past [Timeframe], I have successfully led [Project/Metric], which resulted in [Outcome].\n\nI look forward to discussing how I can continue to drive success for the team. Please let me know your availability next week.\n\nBest regards,\n[Your Name]',
          score: 91,
          model: 'GPT-4o'
        },
        {
          id: '2',
          timestamp: '2 hours ago',
          original: 'make a landing page copy',
          improved: '# Head: Transforming Ideas into High-Converting Interfaces\n\n## Subhead:\nCreate stunning, premium landing pages that build trust and convert visitors into loyal customers in minutes. No coding required.\n\n## Key Value Props:\n- **Glassmorphic components**: State-of-the-art interactive visual fidelity.\n- **Lightning Fast**: Blazing loading speeds optimized for conversion SEO.\n- **Dynamic layouts**: Adapts instantly to phone, tablet, or desktop views.',
          score: 84,
          model: 'Claude 3.5'
        }
      ];
      setHistory(initialHistory);
      localStorage.setItem('prompt_history', JSON.stringify(initialHistory));
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('mock_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('mock_auth', 'false');
    setActiveTab('optimize');
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

  // Render view depending on authentication and active tab
  const renderContent = () => {
    if (!isAuthenticated) {
      return <LoginView onLogin={handleLogin} />;
    }

    switch (activeTab) {
      case 'optimize':
        return <PopupView onAddHistory={handleAddHistory} />;
      case 'history':
        return <HistoryView history={history} onClearHistory={handleClearHistory} />;
      case 'settings':
        return <SettingsView onLogout={handleLogout} />;
      default:
        return <PopupView onAddHistory={handleAddHistory} />;
    }
  };

  return (
    <>
      {/* Content wrapper */}
      <div style={{ flex: 1, height: '100%', position: 'relative', overflow: 'hidden' }}>
        {renderContent()}
      </div>

      {/* Navigation Footer */}
      {isAuthenticated && (
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
