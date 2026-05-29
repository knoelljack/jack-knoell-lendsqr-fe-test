'use client';

import cn from 'classnames';
import styles from './Pagination.module.scss';

type PaginationProps = {
  page: number;
  perPage: number;
  total: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function buildPageRange(
  current: number,
  totalPages: number,
): Array<number | 'ellipsis'> {
  if (totalPages <= 1) return [1];

  const includes = new Set<number>([
    1,
    2,
    totalPages - 1,
    totalPages,
    current - 1,
    current,
    current + 1,
  ]);

  const sorted = [...includes]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const result: Array<number | 'ellipsis'> = [];
  let prev: number | null = null;
  for (const page of sorted) {
    if (prev !== null && page - prev > 1) {
      result.push('ellipsis');
    }
    result.push(page);
    prev = page;
  }
  return result;
}

export function Pagination({
  page,
  perPage,
  total,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const pageRange = buildPageRange(clampedPage, totalPages);

  return (
    <nav aria-label="Pagination" className={styles.root}>
      <div className={styles.summary}>
        <span>Showing</span>
        <label className={styles.selectLabel}>
          <span className={styles.srOnly}>Results per page</span>
          <select
            className={styles.select}
            value={perPage}
            onChange={(event) => onPerPageChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <span>out of {total.toLocaleString('en-US')}</span>
      </div>

      <ul className={styles.pager}>
        <li>
          <button
            type="button"
            className={cn(styles.pageButton, styles.pageButton_nav)}
            disabled={clampedPage <= 1}
            onClick={() => onPageChange(clampedPage - 1)}
            aria-label="Previous page"
          >
            <span aria-hidden="true">‹</span>
          </button>
        </li>
        {pageRange.map((item, idx) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${idx}`} className={styles.ellipsis} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cn(
                  styles.pageButton,
                  item === clampedPage && styles.pageButton_active,
                )}
                onClick={() => onPageChange(item)}
                aria-current={item === clampedPage ? 'page' : undefined}
                aria-label={`Go to page ${item}`}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            className={cn(styles.pageButton, styles.pageButton_nav)}
            disabled={clampedPage >= totalPages}
            onClick={() => onPageChange(clampedPage + 1)}
            aria-label="Next page"
          >
            <span aria-hidden="true">›</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
