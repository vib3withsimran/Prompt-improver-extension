import React from 'react';

interface LoginViewProps {
  onLogin: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  return (
    <div className="animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      position: 'relative'
    }}>
      {/* Brand Logo Visual */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: 'var(--gradient-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
        position: 'relative',
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#fff'
      }}>
        P
      </div>

      <h1 style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '6px',
        textAlign: 'center'
      }}>
        Prompt <span className="gradient-text">Improver</span>
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '13px',
        textAlign: 'center',
        marginBottom: '32px',
        padding: '0 20px'
      }}>
        Refine, score, and optimize your prompts for ChatGPT, Claude, and Gemini in one click.
      </p>

      {/* Login Card */}
      <div className="glass-panel" style={{
        width: '100%',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--primary-purple)', fontWeight: 'bold' }}>✓</span> Save prompt history automatically
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--primary-purple)', fontWeight: 'bold' }}>✓</span> Access prompt templates library
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--primary-purple)', fontWeight: 'bold' }}>✓</span> Sync settings across devices
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="gradient-btn" 
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '14px',
            marginTop: '10px'
          }}
        >
          {/* Mock Google Logo using inline styles & letters */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'white',
            color: '#4285F4',
            fontSize: '11px',
            fontWeight: 'bold',
            marginRight: '6px'
          }}>G</span>
          Sign in with Google
        </button>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        fontSize: '11px',
        color: 'var(--text-muted)'
      }}>
        Secure authentication via Supabase
      </div>
    </div>
  );
};
