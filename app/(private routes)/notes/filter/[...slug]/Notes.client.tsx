'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import css from '../../App.module.css';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

import { fetchNotes } from '@/lib/api/clientApi';

type NotesClientProps = {
  tag?: string;
};

export default function NotesClient({
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback(
    (value: string) => {
      setSearch(value);
      setPage(1);
    },
    500
  );

const { data } = useQuery({
  queryKey: ['notes', page, search, tag],
  queryFn: () =>
    fetchNotes(
      search,
      page,
      tag
    ),
  placeholderData: (previousData) => previousData,
});


  return (
    <main className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />

        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <Link
          href="/notes/action/create"
          className={css.button}
        >
          Create note +
        </Link>
      </div>

      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}
    </main>
  );
}