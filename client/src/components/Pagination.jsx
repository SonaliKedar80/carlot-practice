export default function Pagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label="Pages">
      <button
        type="button"
        className="button button-light"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Previous
      </button>

      {pages.map((number) => (
        <button
          key={number}
          type="button"
          className={number === page ? 'button' : 'button button-light'}
          aria-current={number === page ? 'page' : undefined}
          onClick={() => onChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        type="button"
        className="button button-light"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </button>

      <span className="pagination-label">
        Page {page} of {totalPages}
      </span>
    </nav>
  );
}
