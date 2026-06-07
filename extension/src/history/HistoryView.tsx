import React, { useState } from 'react';
import { Search, Copy, Check, Calendar, Trash2 } from 'lucide-react';

export interface HistoryItem {
  id: string;
  timestamp: string;
  original: string;
  improved: string;
  score: number;
  model: string;
}

interface HistoryViewProps {
  history: HistoryItem[];
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ history, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredHistory = history.filter(item => 
    item.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.improved.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (id: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
        <h2 style={{ fontSize: '18px', fontWeight: '600' }}>History Log</h2>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-danger)',
              fontSize: '11px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              opacity: 0.8
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            <Trash2 size={12} />
            Clear All
          </button>
        )}
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)'
        }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search history..."
          className="form-input"
          style={{
            padding: '8px 12px 8px 32px',
            fontSize: '12px'
          }}
        />
      </div>

      {/* List Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1
      }}>
        {filteredHistory.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
            color: 'var(--text-muted)',
            gap: '8px'
          }}>
            <Calendar size={28} strokeWidth={1.5} />
            <div style={{ fontSize: '13px', fontWeight: '500' }}>No prompts logged yet</div>
            <div style={{ fontSize: '11px' }}>Optimized prompts appear here automatically.</div>
          </div>
        ) : (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              className="glass-panel"
              style={{
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderLeft: expandedId === item.id ? '3px solid var(--primary-purple)' : '1px solid var(--border-muted)',
                background: expandedId === item.id ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Row Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>{item.model}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                </div>
                {/* Score badge */}
                <div style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: item.score >= 85 ? 'var(--color-success)' : 'var(--color-warning)',
                  background: item.score >= 85 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  border: '1px solid ' + (item.score >= 85 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)')
                }}>
                  {item.score} pts
                </div>
              </div>

              {/* Snippet text */}
              <div style={{
                fontSize: '12px',
                color: 'var(--text-secondary)',
                lineHeight: '1.4',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: expandedId === item.id ? 8 : 1,
                WebkitBoxOrient: 'vertical',
                whiteSpace: 'pre-wrap',
                fontFamily: expandedId === item.id ? 'Consolas, monospace' : 'inherit',
                background: expandedId === item.id ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
                padding: expandedId === item.id ? '8px' : '0',
                borderRadius: '4px'
              }}>
                {expandedId === item.id ? item.improved : item.original}
              </div>

              {/* Actions row when expanded */}
              {expandedId === item.id && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '6px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Original prompt: "{item.original.substring(0, 20)}..."</span>
                  <button
                    onClick={(e) => handleCopy(item.id, item.improved, e)}
                    className="btn-secondary"
                    style={{ padding: '3px 6px', fontSize: '10px', borderRadius: '4px' }}
                  >
                    {copiedId === item.id ? <Check size={10} style={{ color: 'var(--color-success)' }} /> : <Copy size={10} />}
                    {copiedId === item.id ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
