export type NoteColor = 'yellow' | 'pink' | 'blue' | 'green' | 'purple';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  createdAt: string;
  updatedAt: string;
}