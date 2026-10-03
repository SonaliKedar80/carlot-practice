import { useEffect, useState } from 'react';
import { fetchCars, fetchMakes } from './api.js';
import Filters from './components/Filters.jsx';
import CarList from './components/CarList.jsx';
import Pagination from './components/Pagination.jsx';
import ContactForm from './components/ContactForm.jsx';

const PAGE_SIZE = 6;

export default function App() {
  const [makes, setMakes] = useState([]);
  const [filters, setFilters] = useState({ make: '', maxPrice: '', sort: '' });
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ items: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);

  // Load the list of makes once, for the filter dropdown
  useEffect(() => {
    fetchMakes()
      .then(setMakes)
      .catch(() => setMakes([]));
  }, []);

  // Reload the cars whenever the filters or the page change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    fetchCars({ ...filters, page, pageSize: PAGE_SIZE })
      .then((data) => {
        if (!cancelled) setResult(data);
      })
      .catch(() => {
        if (!cancelled) setError('Could not load cars. Is the server running?');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filters, page]);

  function handleFiltersChange(nextFilters) {
    setFilters(nextFilters);
    setPage(1); // a new filter always starts from the first page
  }

  return (
    <div className="page">
      <header className="header">
        <h1>CarLot</h1>
        <p>Find your next used car</p>
      </header>

      <main className="content">
        <Filters makes={makes} filters={filters} onChange={handleFiltersChange} />

        {error && <p className="message message-error">{error}</p>}
        {loading && <p className="message">Loading cars…</p>}

        {!loading && !error && (
          <>
            <p className="result-count">{result.total} cars found</p>
            <CarList cars={result.items} onContact={setSelectedCar} />
            <Pagination
              page={page}
              totalPages={result.totalPages}
              onChange={setPage}
            />
          </>
        )}
      </main>

      {selectedCar && (
        <ContactForm car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </div>
  );
}
