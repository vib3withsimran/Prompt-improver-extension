import React, { useState } from 'react';
import { Sparkles, Copy, Check, RotateCcw, ShieldCheck, Flame } from 'lucide-react';

interface PopupViewProps {
  onAddHistory: (prompt: string, improved: string, score: number, model: string) => void;
}

export const PopupView: React.FC<PopupViewProps> = ({ onAddHistory }) => {
  const [model, setModel] = useState<string>('GPT-4o');
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isImproving, setIsImproving] = useState<boolean>(false);
  const [improvedPrompt, setImprovedPrompt] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleImprove = () => {
    if (!inputPrompt.trim()) return;
    setIsImproving(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      const improvements: Record<string, string> = {
        'GPT-4o': `You are an expert copywriter. Rewrite the following text to be highly engaging, professional, and optimized for readability. Break down complex paragraphs into bullet points where appropriate and keep the tone conversational but authoritative.\n\nOriginal Text:\n"${inputPrompt}"`,
        'Claude 3.5': `[System Role: Senior Technical Writer]\nAnalyze the following information and rewrite it for maximum clarity, conciseness, and precision. Address potential edge cases and structure the output with clear markdown headings.\n\nInput Information:\n"${inputPrompt}"`,
        'Gemini 1.5': `Act as a creative problem solver. Refactor the prompt below to generate highly creative yet accurate ideas. Output the response as a structured list of actionable recommendations.\n\nOriginal Prompt:\n"${inputPrompt}"`
      };

      const mockScore = Math.floor(Math.random() * 21) + 75; // Score between 75 and 95
      const mockImproved = improvements[model] || `Optimized for ${model}:\n\n${inputPrompt}`;
      
      setImprovedPrompt(mockImproved);
      setScore(mockScore);
      setIsImproving(false);
      onAddHistory(inputPrompt, mockImproved, mockScore, model);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(improvedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputPrompt('');
    setImprovedPrompt('');
    setScore(0);
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Optimize Prompt</h2>
        <div style={{
          background: 'rgba(6, 182, 212, 0.1)',
          color: 'var(--accent-cyan)',
          padding: '2px 8px',
          borderRadius: '20px',
          fontSize: '10px',
          fontWeight: '600',
          border: '1px solid rgba(6, 182, 212, 0.2)'
        }}>
          Free Tier: 18/50
        </div>
      </div>

      {/* Model Selector */}
      <div style={{
        display: 'flex',
        gap: '6px',
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '3px',
        borderRadius: '8px',
        border: '1px solid var(--border-muted)'
      }}>
        {['GPT-4o', 'Claude 3.5', 'Gemini 1.5'].map((m) => (
          <button
            key={m}
            onClick={() => setModel(m)}
            style={{
              flex: 1,
              padding: '6px',
              fontSize: '11px',
              fontWeight: model === m ? '600' : '500',
              color: model === m ? 'white' : 'var(--text-secondary)',
              background: model === m ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
              border: '1px solid ' + (model === m ? 'rgba(139, 92, 246, 0.4)' : 'transparent'),
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Main Workspace */}
      {!improvedPrompt ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Paste your raw, simple prompt here..."
            className="form-input"
            style={{
              flex: 1,
              minHeight: '220px',
              padding: '12px',
              fontSize: '13px',
              lineHeight: '1.5',
              resize: 'none',
              borderRadius: '12px'
            }}
          />
          <button
            onClick={handleImprove}
            disabled={!inputPrompt.trim() || isImproving}
            className="gradient-btn"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '13px',
              opacity: !inputPrompt.trim() || isImproving ? 0.6 : 1,
              cursor: !inputPrompt.trim() || isImproving ? 'not-allowed' : 'pointer'
            }}
          >
            {isImproving ? (
              <>
                <svg className="animate-spin" style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
                </svg>
                Analyzing prompt structure...
              </>
            ) : (
              <>
                <Sparkles size={15} />
                Optimize & Score Prompt
              </>
            )}
          </button>
        </div>
      ) : (
        /* Results View */
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {/* Scoring Header Card */}
          <div className="glass-panel" style={{
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Optimization Score</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>{score}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 100</span>
              </div>
            </div>

            {/* Score Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: score >= 85 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid ' + (score >= 85 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'),
              fontSize: '11px',
              fontWeight: '600',
              color: score >= 85 ? 'var(--color-success)' : 'var(--color-warning)'
            }}>
              {score >= 85 ? <ShieldCheck size={14} /> : <Flame size={14} />}
              {score >= 85 ? 'Highly Structured' : 'Decent Quality'}
            </div>
          </div>

          {/* Optimized Output Card */}
          <div className="glass-panel" style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: '180px',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              borderBottom: '1px solid var(--border-muted)',
              background: 'rgba(255, 255, 255, 0.01)'
            }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-secondary)' }}>Optimized Prompt</span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={handleCopy}
                  className="btn-secondary"
                  style={{ padding: '4px 8px', fontSize: '10px', borderRadius: '6px' }}
                >
                  {copied ? <Check size={11} style={{ color: 'var(--color-success)' }} /> : <Copy size={11} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
            <pre style={{
              margin: 0,
              padding: '12px',
              fontSize: '12px',
              lineHeight: '1.45',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              color: 'var(--text-primary)',
              fontFamily: 'Consolas, monospace',
              flex: 1
            }}>
              {improvedPrompt}
            </pre>
          </div>

          {/* Footer Controls */}
          <button
            onClick={handleReset}
            className="btn-secondary"
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '13px'
            }}
          >
            <RotateCcw size={14} />
            Optimize Another Prompt
          </button>
        </div>
      )}
    </div>
  );
};
