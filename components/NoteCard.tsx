'use client';

import { useState, useRef, useEffect } from 'react';
import { Note, NoteColor } from '@/lib/types';
import styles from './NoteCard.module.css';

const COLOR_OPTIONS: { value: NoteColor; label: string }[] = [
  { value: 'yellow', label: '🌟 Sunny' },
  { value: 'pink', label: '🌸 Rose' },
  { value: 'blue', label: '🌊 Ocean' },
  { value: 'green', label: '🌿 Mint' },
  { value: 'purple', label: '🔮 Lavender' },
];

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
  onColorChange: (id: string, color: NoteColor) => void;
}

export default function NoteCard({ note, onUpdate, onDelete, onColorChange }: NoteCardProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current && note.title === '') {
      titleRef.current.focus();
    }
  }, []);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(note.id), 300);
  };

  const autoResize = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${styles[note.color]} ${isDeleting ? styles.deleting : ''}`}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.dragHandle}>
          <span></span><span></span><span></span>
        </div>
        <div className={styles.actions}>
          <button
            className={`${styles.colorBtn} ${showColorPicker ? styles.active : ''}`}
            onClick={() => setShowColorPicker((p) => !p)}
            title="Change color"
            aria-label="Change color"
          >
            🎨
          </button>
          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
            title="Delete note"
            aria-label="Delete note"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Color Picker */}
      {showColorPicker && (
        <div className={styles.colorPicker}>
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.value}
              className={`${styles.colorOption} ${styles[c.value]} ${note.color === c.value ? styles.selected : ''}`}
              onClick={() => {
                onColorChange(note.id, c.value);
                setShowColorPicker(false);
              }}
              title={c.label}
              aria-label={c.label}
            >
              {note.color === c.value && <span className={styles.checkmark}>✓</span>}
            </button>
          ))}
        </div>
      )}

      {/* Title */}
      <textarea
        ref={titleRef}
        className={styles.title}
        placeholder="Title..."
        value={note.title}
        maxLength={60}
        rows={1}
        onChange={(e) => {
          autoResize(e.target);
          onUpdate(note.id, { title: e.target.value });
        }}
      />

      {/* Content */}
      <textarea
        ref={contentRef}
        className={styles.content}
        placeholder="Write your note here..."
        value={note.content}
        rows={4}
        onChange={(e) => {
          autoResize(e.target);
          onUpdate(note.id, { content: e.target.value });
        }}
      />

      {/* Footer */}
      <div className={styles.cardFooter}>
        <span className={styles.timestamp}>
          {new Date(note.updatedAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </span>
        <span className={styles.charCount}>{note.content.length} chars</span>
      </div>
    </div>
  );
}