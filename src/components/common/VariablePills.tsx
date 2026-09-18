import React from 'react';
import { Tag } from 'lucide-react';

export interface VariableItem {
  tag: string;
  label: string;
  description?: string;
}

export interface VariablePillsProps {
  variables: VariableItem[];
  onSelect: (tag: string) => void;
  label?: string;
  className?: string;
}

export const VariablePills: React.FC<VariablePillsProps> = ({
  variables,
  onSelect,
  label = 'Variáveis disponíveis (clique para inserir):',
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center gap-1.5 text-xs text-dark-400 font-medium">
          <Tag className="w-3 h-3 text-dark-400" />
          <span>{label}</span>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {variables.map((v) => (
          <button
            key={v.tag}
            type="button"
            onClick={() => onSelect(v.tag)}
            title={v.description || v.label}
            className="inline-flex items-center gap-1 px-2 py-1 rounded bg-dark-900 hover:bg-dark-700 text-[11px] font-mono font-medium text-dark-200 border border-dark-700 hover:border-dark-600 transition-colors"
          >
            <span className="text-[#5865F2] font-bold">{v.tag}</span>
            <span className="text-dark-400 text-[10px] font-sans">({v.label})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
