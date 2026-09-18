import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface DiscordColorPickerProps {
  id?: string;
  color: string;
  onChange: (color: string) => void;
  presetColors?: Array<{ label: string; value: string }>;
  showPresets?: boolean;
  showHistory?: boolean;
  label?: string;
  className?: string;
  triggerType?: 'wheel' | 'swatch';
}

const DISCORD_SWATCHES = [
  '#FFFFFF',
  '#607D8B',
  '#FF7673',
  '#FFBB5C',
  '#FFD74E',
  '#6DE194',
  '#63ECDB',
  '#5ACFF5',
  '#70B1FF',
  '#B072FF',
];

const INITIAL_HISTORY = ['#70B1FF', '#388BFD', '#70B1FF', '#607D8B'];

function parseToRgb(c: string): { r: number; g: number; b: number } {
  if (!c) return { r: 57, g: 100, b: 141 };
  if (c.startsWith('#')) {
    const clean = c.slice(1);
    if (clean.length === 3) {
      return {
        r: parseInt(clean[0] + clean[0], 16) || 0,
        g: parseInt(clean[1] + clean[1], 16) || 0,
        b: parseInt(clean[2] + clean[2], 16) || 0,
      };
    }
    return {
      r: parseInt(clean.substring(0, 2), 16) || 0,
      g: parseInt(clean.substring(2, 4), 16) || 0,
      b: parseInt(clean.substring(4, 6), 16) || 0,
    };
  }
  if (c.startsWith('rgb')) {
    const parts = c.match(/\d+/g);
    if (parts && parts.length >= 3) {
      return {
        r: parseInt(parts[0], 10) || 0,
        g: parseInt(parts[1], 10) || 0,
        b: parseInt(parts[2], 10) || 0,
      };
    }
  }
  return { r: 57, g: 100, b: 141 };
}

function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
  const i = Math.floor((h / 60) % 6);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  let r = 0,
    g = 0,
    b = 0;
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHsv(r: number, g: number, b: number): { h: number; s: number; v: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h *= 60;
  }
  return { h: Math.round(h < 0 ? h + 360 : h), s, v };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export const DiscordColorPicker: React.FC<DiscordColorPickerProps> = ({
  id,
  color,
  onChange,
  presetColors,
  showPresets = true,
  showHistory = true,
  label,
  className = '',
  triggerType = 'wheel',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(INITIAL_HISTORY);

  // HSV & input states
  const initialRgb = parseToRgb(color);
  const initialHsv = rgbToHsv(initialRgb.r, initialRgb.g, initialRgb.b);
  const [hsv, setHsv] = useState<{ h: number; s: number; v: number }>(initialHsv);
  const [hexInput, setHexInput] = useState(rgbToHex(initialRgb.r, initialRgb.g, initialRgb.b));
  const [rgbInputs, setRgbInputs] = useState({
    r: String(initialRgb.r),
    g: String(initialRgb.g),
    b: String(initialRgb.b),
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const satValRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  // Sync state if external color prop changes and not currently focused/dragging
  useEffect(() => {
    const rgb = parseToRgb(color);
    const newHex = rgbToHex(rgb.r, rgb.g, rgb.b);
    if (newHex.toUpperCase() !== hexInput.toUpperCase()) {
      setHexInput(newHex);
      setRgbInputs({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) });
      setHsv(rgbToHsv(rgb.r, rgb.g, rgb.b));
    }
  }, [color]);

  // Handle outside click to close popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const pushToHistory = useCallback((c: string) => {
    setHistory((prev) => {
      const normalized = c.startsWith('#') ? c.toUpperCase() : `#${c}`.toUpperCase();
      const filtered = prev.filter((item) => item.toUpperCase() !== normalized);
      return [normalized, ...filtered].slice(0, 8);
    });
  }, []);

  const selectColorDirect = useCallback(
    (newHexWithHash: string) => {
      const rgb = parseToRgb(newHexWithHash);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setHsv(newHsv);
      setHexInput(hex);
      setRgbInputs({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) });
      onChange(`#${hex}`);
      pushToHistory(`#${hex}`);
    },
    [onChange, pushToHistory]
  );

  // Saturation / Value Drag Handling
  const handleSatValMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!satValRef.current) return;
      const rect = satValRef.current.getBoundingClientRect();
      const s = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const v = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));

      setHsv((prev) => {
        const next = { ...prev, s, v };
        const rgb = hsvToRgb(next.h, next.s, next.v);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setHexInput(hex);
        setRgbInputs({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) });
        onChange(`#${hex}`);
        return next;
      });
    },
    [onChange]
  );

  const handleSatValDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const isTouch = 'touches' in e;
    const clientX = isTouch ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = isTouch ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    handleSatValMove(clientX, clientY);

    const onMove = (moveEv: MouseEvent | TouchEvent) => {
      const mX = 'touches' in moveEv ? moveEv.touches[0].clientX : (moveEv as MouseEvent).clientX;
      const mY = 'touches' in moveEv ? moveEv.touches[0].clientY : (moveEv as MouseEvent).clientY;
      handleSatValMove(mX, mY);
    };

    const onEnd = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      setHsv((current) => {
        const rgb = hsvToRgb(current.h, current.s, current.v);
        pushToHistory(`#${rgbToHex(rgb.r, rgb.g, rgb.b)}`);
        return current;
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  };

  // Hue Slider Drag Handling
  const handleHueMove = useCallback(
    (clientX: number) => {
      if (!hueRef.current) return;
      const rect = hueRef.current.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const h = Math.round(fraction * 360) % 360;

      setHsv((prev) => {
        const next = { ...prev, h };
        const rgb = hsvToRgb(next.h, next.s, next.v);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setHexInput(hex);
        setRgbInputs({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) });
        onChange(`#${hex}`);
        return next;
      });
    },
    [onChange]
  );

  const handleHueDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const isTouch = 'touches' in e;
    const clientX = isTouch ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    handleHueMove(clientX);

    const onMove = (moveEv: MouseEvent | TouchEvent) => {
      const mX = 'touches' in moveEv ? moveEv.touches[0].clientX : (moveEv as MouseEvent).clientX;
      handleHueMove(mX);
    };

    const onEnd = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      setHsv((current) => {
        const rgb = hsvToRgb(current.h, current.s, current.v);
        pushToHistory(`#${rgbToHex(rgb.r, rgb.g, rgb.b)}`);
        return current;
      });
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  };

  // Input changes
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/#/g, '').slice(0, 6);
    setHexInput(raw);
    if (raw.length === 6) {
      const rgb = parseToRgb(`#${raw}`);
      const newHsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
      setHsv(newHsv);
      setRgbInputs({ r: String(rgb.r), g: String(rgb.g), b: String(rgb.b) });
      onChange(`#${raw.toUpperCase()}`);
      pushToHistory(`#${raw.toUpperCase()}`);
    }
  };

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: string) => {
    const num = Math.max(0, Math.min(255, parseInt(val, 10) || 0));
    const nextInputs = { ...rgbInputs, [channel]: val === '' ? '' : String(num) };
    setRgbInputs(nextInputs);

    const r = channel === 'r' ? num : parseInt(nextInputs.r, 10) || 0;
    const g = channel === 'g' ? num : parseInt(nextInputs.g, 10) || 0;
    const b = channel === 'b' ? num : parseInt(nextInputs.b, 10) || 0;

    const hex = rgbToHex(r, g, b);
    setHexInput(hex);
    setHsv(rgbToHsv(r, g, b));
    onChange(`#${hex}`);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef} id={id}>
      {label && (
        <span className="block text-xs font-semibold text-dark-300 uppercase tracking-wider mb-1.5">
          {label}
        </span>
      )}

      {/* Trigger Button */}
      {triggerType === 'wheel' ? (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`bg-dark-900 rounded-lg flex items-center cursor-pointer w-8 h-8 justify-center hover:bg-dark-700 transition-colors border border-dark-700 ${
            isOpen ? 'ring-2 ring-[#5865F2] bg-dark-700 shadow-md' : ''
          }`}
          title="Alterar cor"
        >
          <div className="flex items-center justify-center h-8 w-8">
            <svg width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8.001" cy="1.778" r="1.778" fill="#B072FF" />
              <circle cx="12.446" cy="3.556" r="1.778" fill="#FF7673" />
              <circle cx="14.223" cy="8" r="1.778" fill="#FFBB5C" />
              <circle cx="12.446" cy="12.444" r="1.778" fill="#FFD74E" />
              <circle cx="8.001" cy="14.222" r="1.778" fill="#6DE194" />
              <circle cx="3.556" cy="12.444" r="1.778" fill="#63ECDB" />
              <circle cx="1.779" cy="8" r="1.778" fill="#5ACFF5" />
              <circle cx="3.556" cy="3.556" r="1.778" fill="#70B1FF" />
            </svg>
          </div>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-700 border border-dark-700 transition-colors ${
            isOpen ? 'ring-2 ring-[#5865F2]' : ''
          }`}
        >
          <div
            className="w-5 h-5 rounded-full border border-white/20 shadow-inner flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-mono font-medium text-dark-200 uppercase">
            {color.startsWith('#') ? color : `#${rgbToHex(initialRgb.r, initialRgb.g, initialRgb.b)}`}
          </span>
        </button>
      )}

      {/* Popover matching Discord exact UI */}
      {isOpen && (
        <div className="w-[280px] rounded-2xl bg-[#232428] border border-[#1f2023] shadow-2xl p-4 absolute top-[calc(100%+8px)] left-0 z-50 select-none animate-in fade-in zoom-in-95 duration-150">
          {/* Section 1: Cores do Discord */}
          <div>
            <span className="block text-xs font-bold text-[#dbdee1] mb-2.5">
              Cores do Discord
            </span>
            <div className="flex items-center justify-between">
              {DISCORD_SWATCHES.map((swatch) => (
                <button
                  key={swatch}
                  type="button"
                  onClick={() => selectColorDirect(swatch)}
                  className="w-5 h-5 rounded-full cursor-pointer hover:scale-115 active:scale-95 transition-transform shadow-xs shrink-0"
                  style={{ backgroundColor: swatch }}
                  title={swatch}
                />
              ))}
            </div>
          </div>

          {/* Section 2: Histórico */}
          {showHistory && (
            <div className="mt-3.5">
              <span className="block text-xs font-bold text-[#dbdee1] mb-2.5">
                Histórico
              </span>
              <div className="flex items-center gap-2">
                {history.slice(0, 7).map((histColor, idx) => (
                  <button
                    key={`${histColor}-${idx}`}
                    type="button"
                    onClick={() => selectColorDirect(histColor)}
                    className="w-5 h-5 rounded-full cursor-pointer hover:scale-115 active:scale-95 transition-transform shadow-xs shrink-0"
                    style={{ backgroundColor: histColor }}
                    title={histColor}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Section 3: 2D Saturation & Brightness Box */}
          <div
            ref={satValRef}
            onMouseDown={handleSatValDown}
            onTouchStart={handleSatValDown}
            className="w-full h-36 rounded-lg relative cursor-crosshair overflow-hidden mt-3.5 select-none"
            style={{
              backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
            }}
          >
            {/* White to transparent gradient (horizontal) */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)',
              }}
            />
            {/* Transparent to black gradient (vertical) */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0) 100%)',
              }}
            />

            {/* Circular hollow thumb */}
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-md absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-none"
              style={{
                left: `${Math.max(0, Math.min(100, hsv.s * 100))}%`,
                top: `${Math.max(0, Math.min(100, (1 - hsv.v) * 100))}%`,
              }}
            />
          </div>

          {/* Section 4: Rainbow Hue Slider */}
          <div
            ref={hueRef}
            onMouseDown={handleHueDown}
            onTouchStart={handleHueDown}
            className="w-full h-2.5 rounded-full relative cursor-pointer mt-3 select-none"
            style={{
              background:
                'linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)',
            }}
          >
            {/* White vertical bar thumb */}
            <div
              className="w-1.5 h-3.5 bg-white rounded-xs shadow-md absolute top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-none"
              style={{
                left: `${Math.max(0, Math.min(100, (hsv.h / 360) * 100))}%`,
              }}
            />
          </div>

          {/* Section 5: Inputs (Hex, R, G, B) */}
          <div className="flex items-start gap-2 mt-3.5">
            {/* Hex Input */}
            <div className="flex-[1.5] flex flex-col items-center">
              <input
                type="text"
                maxLength={6}
                value={hexInput}
                onChange={handleHexChange}
                className="w-full h-8 bg-[#18191c] text-center font-bold text-xs text-white rounded-md border border-transparent focus:border-[#5865F2] focus:outline-none transition-colors uppercase tracking-wider"
              />
              <span className="text-[11px] font-medium text-[#949ba4] mt-1">Hex</span>
            </div>

            {/* R Input */}
            <div className="flex-1 flex flex-col items-center">
              <input
                type="number"
                min={0}
                max={255}
                value={rgbInputs.r}
                onChange={(e) => handleRgbChange('r', e.target.value)}
                className="w-full h-8 bg-[#18191c] text-center font-bold text-xs text-white rounded-md border border-transparent focus:border-[#5865F2] focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[11px] font-medium text-[#949ba4] mt-1">R</span>
            </div>

            {/* G Input */}
            <div className="flex-1 flex flex-col items-center">
              <input
                type="number"
                min={0}
                max={255}
                value={rgbInputs.g}
                onChange={(e) => handleRgbChange('g', e.target.value)}
                className="w-full h-8 bg-[#18191c] text-center font-bold text-xs text-white rounded-md border border-transparent focus:border-[#5865F2] focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[11px] font-medium text-[#949ba4] mt-1">G</span>
            </div>

            {/* B Input */}
            <div className="flex-1 flex flex-col items-center">
              <input
                type="number"
                min={0}
                max={255}
                value={rgbInputs.b}
                onChange={(e) => handleRgbChange('b', e.target.value)}
                className="w-full h-8 bg-[#18191c] text-center font-bold text-xs text-white rounded-md border border-transparent focus:border-[#5865F2] focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="text-[11px] font-medium text-[#949ba4] mt-1">B</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
