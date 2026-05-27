import type { ComponentType } from 'react';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';

import css from './Pagination.module.css';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (selected: number) => void;
}

interface SelectedItem {
  selected: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handlePageChange = ({ selected }: SelectedItem) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
  pageCount={totalPages}
  forcePage={currentPage - 1}
  onPageChange={handlePageChange}
  containerClassName={css.pagination}
  activeClassName={css.active}
  previousLabel="<"
  nextLabel=">"
/>
  );
}
