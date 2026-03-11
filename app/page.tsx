'use client';

import { DragEvent, useMemo, useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import Header from '@/components/Header';
import NoteCard from '@/components/NoteCard';
import styles from './page.module.css';

export default function Home() {
  const { notes, addNote, updateNote, deleteNote, reorderNotes, changeColor } = useNotes();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null);
  const [dropTargetNoteId, setDropTargetNoteId] = useState<string | null>(null);

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

  const handleDragStart = (event: DragEvent<HTMLDivElement>, noteId: string) => {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', noteId);
    setDraggedNoteId(noteId);
    setDropTargetNoteId(noteId);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>, noteId: string) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    if (draggedNoteId && draggedNoteId !== noteId && dropTargetNoteId !== noteId) {
      setDropTargetNoteId(noteId);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, noteId: string) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData('text/plain') || draggedNoteId;

    if (sourceId && sourceId !== noteId) {
      reorderNotes(sourceId, noteId);
    }

    setDraggedNoteId(null);
    setDropTargetNoteId(null);
  };

  const clearDragState = () => {
    setDraggedNoteId(null);
    setDropTargetNoteId(null);
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
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragEnd={clearDragState}
                onColorChange={changeColor}
                isDragging={draggedNoteId === note.id}
                isDropTarget={dropTargetNoteId === note.id && draggedNoteId !== note.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
