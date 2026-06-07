import React, { useState } from 'react';
import { LogOut, Key, Shield, HelpCircle, Eye, EyeOff } from 'lucide-react';

interface SettingsViewProps {
  onLogout: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onLogout }) => {
  const [apiKey, setApiKey] = useState<string>('sk-proj-••••••••••••••••3aB8');
  const [showKey, setShowKey] = useState<boolean>(false);
  const [autoInject, setAutoInject] = useState<boolean>(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState<boolean>(false);

  return (
    <div className="animate-fade-in" style={{
      padding: '16px',
      height: 'calc(100% - 60px)',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      {/* Header */}
      <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Settings</h2>

      {/* Profile Card */}
      <div className="glass-panel" style={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Avatar */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gradient-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'white'
          }}>
            SG
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Simran Gupta</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>simran@example.com</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="btn-secondary"
          style={{
            padding: '6px',
            borderRadius: '8px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            color: 'var(--color-danger)'
          }}
          title="Sign Out"
        >
          <LogOut size={14} />
        </button>
      </div>

      {/* API Configuration Card */}
      <div className="glass-panel" style={{
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600' }}>
          <Key size={14} style={{ color: 'var(--primary-purple)' }} />
          Custom API Keys (Optional)
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="form-input"
            style={{
              padding: '8px 32px 8px 10px',
              fontSize: '11px',
              fontFamily: showKey ? 'inherit' : 'monospace'
            }}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
          Enter a custom key to bypass free limits. Saved locally in extension storage.
        </div>
      </div>

      {/* Usage Quota Card */}
      <div className="glass-panel" style={{
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Monthly Usage Limit</span>
          <span style={{ fontWeight: '600' }}>18 / 50 optimizations</span>
        </div>
        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: '3px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '36%',
            height: '100%',
            background: 'var(--gradient-main)',
            borderRadius: '3px'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)' }}>
          <span>Resets on July 1</span>
          <span style={{ color: 'var(--accent-cyan)', cursor: 'pointer', fontWeight: '500' }}>Upgrade to Premium</span>
        </div>
      </div>

      {/* Settings Options Card */}
      <div className="glass-panel" style={{
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Toggle Option 1 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Inject prompt helper UI</span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Show improve buttons directly on ChatGPT</span>
          </div>
          <input
            type="checkbox"
            checked={autoInject}
            onChange={(e) => setAutoInject(e.target.checked)}
            style={{
              width: '32px',
              height: '16px',
              cursor: 'pointer',
              accentColor: 'var(--primary-purple)'
            }}
          />
        </div>

        {/* Toggle Option 2 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: '500' }}>Anonymous usage analytics</span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Help us refine the optimization models</span>
          </div>
          <input
            type="checkbox"
            checked={analyticsEnabled}
            onChange={(e) => setAnalyticsEnabled(e.target.checked)}
            style={{
              width: '32px',
              height: '16px',
              cursor: 'pointer',
              accentColor: 'var(--primary-purple)'
            }}
          />
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '8px'
      }}>
        <a href="#docs" style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
          <HelpCircle size={12} /> Support Docs
        </a>
        <span>•</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <Shield size={12} /> v1.0.0 (MV3)
        </span>
      </div>
    </div>
  );
};
