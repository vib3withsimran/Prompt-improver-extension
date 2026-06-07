import React, { useState } from 'react';
import { signInWithGoogle } from '../services/supabase';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        marginBottom: '24px',
        padding: '0 20px'
      }}>
        Refine, score, and optimize your prompts for ChatGPT, Claude, and Gemini in one click.
      </p>

      {/* Error Message Panel */}
      {errorMsg && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--color-danger)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '11px',
          width: '100%',
          marginBottom: '14px',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          {errorMsg}
        </div>
      )}

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
          onClick={handleLogin}
          disabled={loading}
          className="gradient-btn" 
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '14px',
            marginTop: '10px',
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.8 : 1
          }}
        >
          {loading ? (
            <>
              <svg className="animate-spin" style={{ width: '16px', height: '16px', marginRight: '6px' }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
              </svg>
              Connecting...
            </>
          ) : (
            <>
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
            </>
          )}
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
