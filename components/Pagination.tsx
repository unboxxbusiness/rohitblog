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
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center flex-wrap gap-2 my-16">
      {currentPage > 1 && (
        <Link 
          href={currentPage - 1 === 1 ? basePath : `${basePath}/p/${currentPage - 1}`} 
          className="px-4 py-2 border border-border-subtle bg-bg-primary text-text-primary font-medium transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          ← Prev
        </Link>
      )}
      
      {startPage > 1 && (
        <>
          <Link 
            href={basePath} 
            className="px-4 py-2 border border-border-subtle bg-bg-primary text-text-primary font-medium transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            1
          </Link>
          {startPage > 2 && <span className="p-2">...</span>}
        </>
      )}

      {pages.map(p => (
        <Link 
          href={p === 1 ? basePath : `${basePath}/p/${p}`} 
          key={p} 
          className={`px-4 py-2 border ${p === currentPage ? 'bg-gold text-bg-primary border-gold font-bold hover:text-bg-primary' : 'border-border-subtle bg-bg-primary text-text-primary font-medium hover:border-gold hover:text-gold'} transition-colors duration-300`}
        >
          {p}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="p-2">...</span>}
          <Link 
            href={`${basePath}/p/${totalPages}`} 
            className="px-4 py-2 border border-border-subtle bg-bg-primary text-text-primary font-medium transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link 
          href={`${basePath}/p/${currentPage + 1}`} 
          className="px-4 py-2 border border-border-subtle bg-bg-primary text-text-primary font-medium transition-colors duration-300 hover:border-gold hover:text-gold"
        >
          Next →
        </Link>
      )}
    </div>
  );
}
