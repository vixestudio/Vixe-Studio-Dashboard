import React, { useState, useRef, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { DiscordRole } from '../../types';
import { ROLES_LIST as DEFAULT_ROLES } from '../../data/mockData';

export interface DiscordRoleSelectProps {
  id?: string;
  selectedRoleIds: string[];
  onChange: (roleIds: string[]) => void;
  roles?: DiscordRole[];
  placeholder?: string;
  label?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}

const PRESET_ROLE_COLORS = [
  'rgb(255, 255, 255)',
  'rgb(96, 125, 138)',
  'rgb(255, 118, 115)',
  'rgb(255, 187, 92)',
  'rgb(255, 215, 78)',
  'rgb(109, 225, 148)',
  'rgb(99, 236, 219)',
  'rgb(90, 207, 245)',
  'rgb(112, 177, 255)',
  'rgb(176, 114, 255)',
];

export const DiscordRoleSelect: React.FC<DiscordRoleSelectProps> = ({
  id,
  selectedRoleIds,
  onChange,
  roles = DEFAULT_ROLES,
  placeholder = 'Selecione um cargo',
  label,
  description,
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRoles, setCurrentRoles] = useState<DiscordRole[]>(roles);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [selectedColor, setSelectedColor] = useState('rgb(96, 125, 138)');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentRoles(roles);
  }, [roles]);

  const handleClose = () => {
    setIsOpen(false);
    setIsCreatingRole(false);
    setSearchQuery('');
  };

  const toggleRole = (roleId: string) => {
    if (selectedRoleIds.includes(roleId)) {
      onChange(selectedRoleIds.filter((id) => id !== roleId));
    } else {
      onChange([...selectedRoleIds, roleId]);
    }
  };

  const removeRole = (roleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedRoleIds.filter((id) => id !== roleId));
  };

  const handleAddAllRoles = () => {
    const allIds = currentRoles.map((r) => r.id);
    const areAllSelected = allIds.every((id) => selectedRoleIds.includes(id));
    if (areAllSelected) {
      onChange([]);
    } else {
      onChange(allIds);
    }
  };

  const handleSaveRole = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newRoleName.trim()) return;

    const newId = `role-${Date.now()}`;
    const newRole: DiscordRole = {
      id: newId,
      name: newRoleName.trim(),
      color: selectedColor,
    };

    setCurrentRoles((prev) => [...prev, newRole]);
    onChange([...selectedRoleIds, newId]);
    setNewRoleName('');
    setIsCreatingRole(false);
  };

  const selectedRoleObjects = selectedRoleIds
    .map((id) => currentRoles.find((r) => r.id === id || r.name === id))
    .filter(Boolean) as DiscordRole[];

  const filteredRoles = currentRoles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`relative max-w-field w-full ${className}`}
      ref={containerRef}
      id={id}
      translate="no"
    >
      {label && (
        <label className="text-sm font-medium text-dark-300 mb-1 block">
          {label}
        </label>
      )}
      {description && (
        <p className="text-xs text-dark-500 mb-2 leading-relaxed">
          {description}
        </p>
      )}

      {/* Trigger Box matching MEE6 DOM */}
      <div
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
              setTimeout(() => searchInputRef.current?.focus(), 50);
            }
          }
        }}
        className={`rounded-lg bg-grey-700 min-h-[50px] flex items-center justify-start border border-solid transition duration-200 ring-opacity-30 px-2 w-full border-grey-700 hover:border-dark-500 cursor-pointer ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        } ${isOpen ? 'border-brand-default' : ''}`}
      >
        <div className="w-full flex items-center justify-start flex-wrap py-1 pl-2 pr-2 py-1">
          {selectedRoleObjects.length === 0 ? (
            <div className="flex items-center justify-start gap-2 cursor-pointer w-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sc-eldPxv ldyhTM opacity-60 transition-all duration-200 hover:opacity-100 shrink-0"
                style={{ marginLeft: -1 }}
              >
                <path
                  d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
                  fill="rgba(154,161,181,0.16)"
                  stroke="#9B9D9F"
                  strokeWidth="1.5"
                />
                <path
                  d="M14.5 12h-5m2.5 2.5v-5"
                  stroke="#9B9D9F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {!searchQuery && (
                <p className="text-dark-300 text-base whitespace-nowrap overflow-hidden text-ellipsis w-[160px] sm:w-full select-none">
                  {placeholder}
                </p>
              )}
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
                className="pl-1 select-none outline-none text-grey-100 bg-transparent rounded-none border-none text-base font-sans max-w-[10px] w-full !max-w-full pl-3"
              />
            </div>
          ) : (
            <div className="flex items-center flex-wrap gap-1.5 w-full">
              {selectedRoleObjects.map((role) => (
                <span
                  key={role.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-all"
                  style={{
                    backgroundColor: `${role.color}15`,
                    borderColor: `${role.color}40`,
                    color: role.color,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: role.color }}
                  />
                  <span className="truncate max-w-[140px] font-sans">{role.name}</span>
                  <button
                    type="button"
                    onClick={(e) => removeRole(role.id, e)}
                    className="text-dark-400 hover:text-white ml-0.5 p-0.5 rounded hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(!isOpen);
                }}
                className="flex items-center gap-1 cursor-pointer pl-1 text-dark-400 hover:text-white transition-colors"
                title="Adicionar mais cargos"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="opacity-70 hover:opacity-100"
                >
                  <path
                    d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
                    fill="rgba(154,161,181,0.16)"
                    stroke="#9B9D9F"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14.5 12h-5m2.5 2.5v-5"
                    stroke="#9B9D9F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!isOpen) setIsOpen(true);
                }}
                className="pl-1 select-none outline-none text-grey-100 bg-transparent rounded-none border-none text-sm font-sans flex-1 min-w-[60px]"
              />
            </div>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9]"
          onClick={handleClose}
        />
      )}

      {/* Dropdown Menu matching MEE6 exact DOM */}
      {isOpen && (
        <div
          className="min-w-[300px] absolute left-0 z-10 w-full rounded-lg bg-dark-900 max-h-[320px] overflow-y-auto overflow-x-hidden transition-all duration-200 shadow-sm p-2 transform scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-dark-800 notranslate pointer-events-auto opacity-100 translate-y-1"
          translate="no"
        >
          {isCreatingRole ? (
            /* Creation Mode */
            <div className="p-2">
              <div className="flex items-center justify-start mb-2">
                <div className="relative flex flex-col w-full max-w-full mr-3 border border-solid border-dark-600 rounded-lg">
                  <div className="overflow-hidden flex items-center justify-start group bg-dark-900 rounded-lg border border-solid transition-all duration-200 focus-within:ring-opacity-30 focus-within:ring-[4px] hover:border-brand-default focus-within:border-brand-default focus-within:ring-brand-default border-dark-900">
                    <input
                      type="text"
                      placeholder="Nome do Cargo"
                      className="bg-transparent outline-none border-none py-3 placeholder:text-dark-300 text-base text-dark-100 w-full text-dark-100 px-4"
                      value={newRoleName}
                      onChange={(e) => setNewRoleName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveRole();
                        }
                      }}
                      autoFocus
                    />
                  </div>
                </div>
                <svg
                  onClick={() => {
                    setIsCreatingRole(false);
                    setNewRoleName('');
                  }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sc-eldPxv kUnUzM cursor-pointer text-dark-400 hover:text-white transition-colors shrink-0"
                >
                  <path
                    d="M7.757 7.757l8.486 8.486m0-8.486l-8.486 8.486"
                    stroke="#9B9D9F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Color Picker Swatches Row */}
              <div className="relative w-full max-w-[360px]">
                <div className="bg-dark-900 rounded-lg flex items-center cursor-pointer p-4 justify-between">
                  {/* Color wheel with hidden native color picker */}
                  <div
                    className="flex items-center justify-center h-8 w-8 relative cursor-pointer"
                    onClick={() => colorInputRef.current?.click()}
                    title="Escolher cor personalizada"
                  >
                    <input
                      ref={colorInputRef}
                      type="color"
                      value={selectedColor.startsWith('#') ? selectedColor : '#607d8a'}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
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

                  {/* Preset Swatches */}
                  {PRESET_ROLE_COLORS.map((col) => {
                    const isColorSelected = selectedColor === col;
                    return (
                      <div
                        key={col}
                        onClick={() => setSelectedColor(col)}
                        className={`w-[18px] h-[18px] rounded-full flex items-center justify-center cursor-pointer ring-[2px] ring-dark-800 hover:ring-dark-900 border-[1px] border-solid border-dark-800 ${
                          isColorSelected ? 'ring-dark-200 hover:ring-dark-200' : ''
                        }`}
                        style={{ backgroundColor: col }}
                      >
                        {isColorSelected && (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-dark-100 h-2 w-2"
                          >
                            <path
                              d="M18 7L9.429 17 6 13"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Salvar novo cargo button */}
              <button
                type="button"
                disabled={!newRoleName.trim()}
                onClick={() => handleSaveRole()}
                className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center gap-1.5 bg-brand-default text-dark-100 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default text-sm px-4 py-2 mt-2"
              >
                <div className="flex flex grow justify-center max-w-full">
                  <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center font-medium">
                    Salvar novo cargo
                  </span>
                </div>
              </button>
            </div>
          ) : (
            /* Roles List Mode */
            <div>
              <ul>
                {/* Adicionar todos os cargos */}
                <li
                  onClick={handleAddAllRoles}
                  className="flex p-2 rounded-lg items-center justify-start text-grey-200 text-base font-medium hover:bg-grey-600 transition duration-200 cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 shrink-0"
                  >
                    <path
                      d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
                      fill="rgba(154,161,181,0.16)"
                      stroke="#9B9D9F"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14.5 12h-5m2.5 2.5v-5"
                      stroke="#9B9D9F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Adicionar todos os cargos
                </li>

                {/* Criar um novo cargo */}
                <li
                  onClick={() => setIsCreatingRole(true)}
                  className="flex p-2 rounded-lg items-center justify-start text-grey-200 text-base font-medium hover:bg-grey-600 transition duration-200 cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 shrink-0"
                  >
                    <path
                      d="M9.31 10.448l4.57-4.57a3 3 0 014.241 4.243l-4.57 4.57a15.501 15.501 0 01-7.2 4.077l-.884.22a.376.376 0 01-.455-.455l.22-.883a15.501 15.501 0 014.078-7.202z"
                      fill="rgba(154,161,181,0.16)"
                    />
                    <path
                      d="M17.25 10.992c-2.121.707-4.95-2.121-4.242-4.242m.871-.871l-4.57 4.57a15.501 15.501 0 00-4.077 7.2l-.22.884a.376.376 0 00.455.455l.883-.22a15.501 15.501 0 007.202-4.078l4.57-4.57a3 3 0 10-4.243-4.241z"
                      stroke="#9B9D9F"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Criar um novo cargo
                </li>
              </ul>

              {/* Roles List */}
              <ul className="border-t border-solid border-grey-500 pt-3 mt-3">
                {filteredRoles.length === 0 ? (
                  <li className="p-2 text-sm text-dark-400 text-center font-sans">
                    Nenhum cargo encontrado
                  </li>
                ) : (
                  filteredRoles.map((role) => {
                    const isSelected =
                      selectedRoleIds.includes(role.id) || selectedRoleIds.includes(role.name);
                    return (
                      <li
                        key={role.id}
                        onClick={() => toggleRole(role.id)}
                        className={`p-2 rounded-lg transition duration-200 hover:bg-grey-600 font-sans text-base text-dark-100 cursor-pointer flex items-center justify-start ${
                          isSelected ? 'bg-grey-600' : ''
                        }`}
                      >
                        <div
                          className="flex items-center justify-between w-full font-medium"
                          style={{ color: role.color }}
                        >
                          <span>{role.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" />}
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
