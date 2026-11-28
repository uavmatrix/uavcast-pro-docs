import React, {useCallback, useEffect, useId, useRef, useState} from 'react';
import clsx from 'clsx';

/** Accessible popover menu used by the navbar (product, language). */
export default function Menu({
  label,
  button,
  children,
  align = 'left',
  className,
  buttonClassName,
  ariaLabel,
}: {
  label?: string;
  button: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  buttonClassName?: string;
  ariaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const id = useId();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    // Focus the first item for keyboard users.
    const first = ref.current?.querySelector<HTMLElement>('[role="menuitem"],[role="menuitemradio"]');
    first?.focus({preventScroll: true});
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const items = [...(ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"],[role="menuitemradio"]') ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div className={clsx('uvm-menu-wrap', className)} ref={ref}>
      <button
        ref={btn}
        type="button"
        className={clsx('uvm-ghost', buttonClassName)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}>
        {button}
      </button>
      {open && (
        <div
          id={id}
          className={clsx('uvm-menu', align === 'right' && 'uvm-menu--right')}
          role="menu"
          onKeyDown={onMenuKey}>
          {label && <div className="uvm-menu__label">{label}</div>}
          {children(close)}
        </div>
      )}
    </div>
  );
}
