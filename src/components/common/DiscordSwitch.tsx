import React from 'react';

export interface DiscordSwitchProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  activeColor?: 'blurple' | 'emerald' | 'amber' | 'rose' | 'zinc' | 'brand';
  size?: 'sm' | 'md';
  switchPosition?: 'left' | 'right';
  className?: string;
}

export const DiscordSwitch: React.FC<DiscordSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  description,
  disabled = false,
  activeColor = 'blurple',
  size = 'md',
  switchPosition = 'right',
  className = '',
}) => {
  const colorClasses = {
    blurple: checked ? 'bg-[#5865F2]' : 'bg-dark-700',
    emerald: checked ? 'bg-[#57F287]' : 'bg-dark-700',
    amber: checked ? 'bg-amber-500' : 'bg-dark-700',
    rose: checked ? 'bg-[#ED4245]' : 'bg-dark-700',
    zinc: checked ? 'bg-zinc-200' : 'bg-dark-700 border border-zinc-700',
    brand: checked ? 'bg-brand-default' : 'bg-dark-700',
  };

  const isSmall = size === 'sm';
  const thumbBg =
    activeColor === 'zinc' && checked
      ? 'bg-zinc-950'
      : activeColor === 'brand' && checked
      ? 'bg-dark-900'
      : 'bg-white';

  const switchButton = (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#5865F2] focus:ring-offset-2 focus:ring-offset-dark-900 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${isSmall ? 'h-5 w-9' : 'h-6 w-11'} ${colorClasses[activeColor]}`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-block transform rounded-full shadow-md ring-0 transition duration-200 ease-in-out ${thumbBg} ${
          isSmall
            ? checked
              ? 'translate-x-4 h-4 w-4'
              : 'translate-x-0 h-4 w-4'
            : checked
            ? 'translate-x-5 h-5 w-5'
            : 'translate-x-0 h-5 w-5'
        }`}
      />
    </button>
  );

  if (!label && !description) {
    return <div className={`inline-flex items-center ${className}`}>{switchButton}</div>;
  }

  const isLeft = switchPosition === 'left';

  return (
    <div
      className={`flex items-start ${isLeft ? 'justify-start gap-3' : 'justify-between gap-4'} py-2 cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      {isLeft && (
        <div className="pt-0.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {switchButton}
        </div>
      )}
      <div className="flex-1 min-w-0">
        {label && (
          <span className="text-sm font-medium text-dark-100 block leading-snug">
            {label}
          </span>
        )}
        {description && (
          <p className="text-xs text-dark-400 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {!isLeft && (
        <div className="pt-0.5 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {switchButton}
        </div>
      )}
    </div>
  );
};
