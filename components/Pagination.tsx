import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  // Show a few surrounding pages instead of all 800+
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`${basePath}?page=${currentPage - 1}`} className="page-btn">
          ← Prev
        </Link>
      )}
      
      {startPage > 1 && (
        <>
          <Link href={`${basePath}?page=1`} className="page-btn">1</Link>
          {startPage > 2 && <span style={{ padding: '0.5rem' }}>...</span>}
        </>
      )}

      {pages.map(p => (
        <Link href={`${basePath}?page=${p}`} key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`}>
          {p}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span style={{ padding: '0.5rem' }}>...</span>}
          <Link href={`${basePath}?page=${totalPages}`} className="page-btn">{totalPages}</Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link href={`${basePath}?page=${currentPage + 1}`} className="page-btn">
          Next →
        </Link>
      )}
    </div>
  );
}
