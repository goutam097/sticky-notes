'use client';

import { useState, useMemo } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import Header from '@/components/Header';
import NoteCard from '@/components/NoteCard';
import styles from './page.module.css';

export default function Home() {
  const { notes, isLoaded, addNote, updateNote, deleteNote, changeColor } = useNotes();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const q = searchQuery.toLowerCase();
    return notes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, searchQuery]);

  const handleAddNote = () => {
    addNote();
    setSearchQuery('');
  };

  return (
    <div className={styles.layout}>
      <Header
        noteCount={notes.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        onAddNote={handleAddNote}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <main className={styles.main}>
        {/* {!isLoaded ? ( */}
        {notes.length === 0 ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Loading your notes…</p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className={styles.empty}>
            {searchQuery ? (
              <>
                <span className={styles.emptyIcon}>🔍</span>
                {/* <h2>No notes match "{searchQuery}"</h2> */}
                {/* <h2>No notes match <span>"{searchQuery}"</span></h2> */}
                <h2>
                  No notes match {"\""}
                  {searchQuery}
                  {"\""}
                </h2>
                <p>Try a different search term</p>
              </>
            ) : (
              <>
                <span className={styles.emptyIcon}>📋</span>
                <h2>No notes yet!</h2>
                <p>Click <strong>New Note</strong> to get started.</p>
                <button className={styles.emptyBtn} onClick={handleAddNote}>
                  + Create your first note
                </button>
              </>
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onUpdate={updateNote}
                onDelete={deleteNote}
                onColorChange={changeColor}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}