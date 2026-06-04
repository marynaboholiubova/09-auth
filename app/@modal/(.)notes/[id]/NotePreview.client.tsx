'use client';

import { useRouter } from 'next/navigation';
import NotePreview from '@/components/NotePreview/NotePreview';
import Modal from '@/components/Modal/Modal';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreview id={id} />
    </Modal>
  );
}