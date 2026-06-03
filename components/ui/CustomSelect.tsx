'use client';

import { useEffect, useRef, useState, KeyboardEvent } from 'react';
import { CheckIcon } from '@/components/ui/icons';

type Option = { value: string; label: string };

interface CustomSelectProps {
  name: string;
  options: Option[];
  defaultValue?: string;
}

/** Branded dropdown that mirrors the design's `.cselect`. A hidden input keeps
 *  the chosen value in the surrounding form's FormData. Keyboard-accessible. */
const CustomSelect = ({ name, options, defaultValue }: CustomSelectProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue ?? options[0]?.value);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const choose = (v: string) => {
    setValue(v);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActive((a) =>
        Math.max(0, Math.min(options.length - 1, a + (e.key === 'ArrowDown' ? 1 : -1))),
      );
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) choose(options[active].value);
      else setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className={`cselect${open ? ' open' : ''}`} ref={ref}>
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className="cselect__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
      >
        <span className="cselect__label">{selected?.label}</span>
        <svg
          className="chev"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div className="cselect__menu" role="listbox">
        {options.map((o, i) => (
          <div
            key={o.value}
            role="option"
            aria-selected={o.value === value}
            className={`cselect__opt${o.value === value ? ' selected' : ''}${
              i === active ? ' active' : ''
            }`}
            onClick={() => choose(o.value)}
            onMouseEnter={() => setActive(i)}
          >
            <span>{o.label}</span>
            <span className="tick">
              <CheckIcon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
