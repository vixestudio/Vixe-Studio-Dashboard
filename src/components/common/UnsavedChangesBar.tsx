import React from 'react';
import { AlertCircle, Loader2, Check } from 'lucide-react';

export interface UnsavedChangesBarProps {
  show: boolean;
  onSave: () => void;
  onReset: () => void;
  isSaving?: boolean;
  isSaved?: boolean;
  message?: string;
  saveLabel?: string;
  resetLabel?: string;
  className?: string;
}

export const UnsavedChangesBar: React.FC<UnsavedChangesBarProps> = ({
  show,
  onSave,
  onReset,
  isSaving = false,
  isSaved = false,
  message = 'Cuidado — você tem alterações não salvas!',
  saveLabel = 'Salvar alterações',
  resetLabel = 'Redefinir',
  className = '',
}) => {
  if (!show && !isSaved) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-2xl bg-[#111214] border border-zinc-700 shadow-2xl rounded-2xl px-4 py-3 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-5 duration-200 select-none ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-400" />
        </div>
        <span className="text-sm font-medium text-white truncate">
          {message}
        </span>
      </div>

      <div className="flex items-center gap-2.5 flex-shrink-0">
        <button
          type="button"
          onClick={onReset}
          disabled={isSaving}
          className="text-xs font-semibold text-dark-300 hover:text-white px-3 py-2 rounded-lg hover:bg-dark-800 transition-colors disabled:opacity-50"
        >
          {resetLabel}
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-[#248046] hover:bg-[#1A6334] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Salvando...</span>
            </>
          ) : isSaved ? (
            <>
              <Check className="w-3.5 h-3.5 text-white" />
              <span>Salvo!</span>
            </>
          ) : (
            <span>{saveLabel}</span>
          )}
        </button>
      </div>
    </div>
  );
};
