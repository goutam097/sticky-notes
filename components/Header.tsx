'use client';

import styles from './Header.module.css';

interface HeaderProps {
  noteCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onAddNote: () => void;
  searchQuery: string;
  onSearch: (q: string) => void;
}

export default function Header({
  noteCount,
  theme,
  onToggleTheme,
  onAddNote,
  searchQuery,
  onSearch,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>📌</div>
        <div>
          <h1 className={styles.title}>StickyBoard</h1>
          <p className={styles.subtitle}>{noteCount} {noteCount === 1 ? 'note' : 'notes'}</p>
        </div>
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          className={styles.search}
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchQuery && (
          <button className={styles.clearSearch} onClick={() => onSearch('')}>✕</button>
        )}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.themeToggle}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className={styles.addBtn} onClick={onAddNote}>
          <span>+</span> New Note
        </button>
      </div>
    </header>
  );
}