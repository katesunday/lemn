import React, { useEffect, useRef, useState } from 'react';
import { PokemonType } from '@/lib/pokemon';

function DropDown({
  list,
  callback,
}: {
  list: PokemonType[];
  callback: (type: string | null) => void;
}) {
  const [selectedType, setSelectedType] = useState<PokemonType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClick(event: MouseEvent) {
      if (dropdown.current && !dropdown.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <div className="relative w-64" ref={dropdown}>
      <label className="block text-sm font-medium text-gray-900 underline">Filter by type:</label>
      <button
        type="button"
        className="focus:ring-darkBlue mt-2 flex w-full items-center justify-between rounded-md bg-white px-3 py-2 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedType ? selectedType.name : 'Choose'}</span>
        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 16 16" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
          {selectedType && (
            <li
              className="hover:bg-darkBlue cursor-pointer px-3 py-2 hover:text-white"
              onClick={() => {
                setSelectedType(null);
                setIsOpen(false);
                callback(null);
              }}
            >
              See All
            </li>
          )}
          {list.map((type) => (
            <li
              key={type.id}
              className={`hover:bg-darkBlue cursor-pointer px-3 py-2 hover:text-white ${
                selectedType?.id === type.id ? 'bg-indigo-100' : ''
              }`}
              onClick={() => {
                setSelectedType(type);
                setIsOpen(false);
                callback(type.name);
              }}
            >
              {type.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
