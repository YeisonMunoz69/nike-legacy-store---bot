import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Trash2, Activity } from 'lucide-react';
import { LogEntry } from '../types';

interface DebugPanelProps {
  logs: LogEntry[];
  onClear: () => void;
}

const DebugPanel: React.FC<DebugPanelProps> = ({ logs, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`fixed left-0 bottom-0 z-40 transition-all duration-500 ease-in-out ${isExpanded ? 'h-72' : 'h-9'} w-full md:w-[600px] bg-black/90 backdrop-blur-md border-t border-r border-white/10 font-mono text-xs shadow-2xl rounded-tr-xl`}>
      {/* Header */}
      <div 
        className="h-9 bg-[#111] flex items-center justify-between px-4 cursor-pointer border-b border-white/5 rounded-tr-xl hover:bg-[#1a1a1a] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 text-green-500">
          <Terminal size={12} />
          <span className="font-bold tracking-wider">SYSTEM LOGS // REGEX ENGINE</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-[10px] text-gray-500 flex items-center gap-1">
             <Activity size={10} className="animate-pulse" />
             Live
           </span>
          <button 
            onClick={(e) => { e.stopPropagation(); onClear(); }}
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Clear Terminal"
          >
            <Trash2 size={12} />
          </button>
          {isExpanded ? <ChevronDown size={12} className="text-gray-400" /> : <ChevronUp size={12} className="text-gray-400" />}
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="h-[calc(100%-36px)] overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {logs.length === 0 && (
            <div className="text-gray-700 italic text-center mt-10">
              &gt; Waiting for input stream...
            </div>
          )}
          {logs.slice().reverse().map((log) => (
            <div key={log.id} className="group relative border-l-2 border-gray-800 hover:border-green-500 pl-3 py-1 transition-colors duration-300">
              <div className="flex justify-between text-[10px] text-gray-600 mb-1">
                <span>{log.timestamp}</span>
                <span className="text-green-500 font-bold uppercase opacity-50 group-hover:opacity-100">{log.intentDetected}</span>
              </div>
              
              <div className="mb-1 text-gray-300">
                <span className="text-blue-400 font-bold">{`>`}</span> {log.userInput}
              </div>
              
              <div className="bg-[#050505] p-2 rounded border border-white/5 mt-1">
                <div className="mb-1 text-[10px] text-gray-500">Regex Used:</div>
                <code className="text-orange-300 block break-all">{log.regexUsed}</code>
              </div>
              
              {log.matchData && log.matchData !== 'null' && (
                <div className="mt-1 text-[10px] text-gray-500 truncate">
                  Match Groups: <span className="text-yellow-600">{log.matchData}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
