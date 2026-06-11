import { fetchNoteById } from '@/lib/api/clientApi'
import css from './NotePreview.module.css';

type NotePreviewProps = {
  id: string;
};

export default async function NotePreview({ id }: NotePreviewProps) {
  const note = await fetchNoteById(id);

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>{note.tag}</p>
      </div>
    </div>
  );
}