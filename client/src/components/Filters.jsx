export default function Filters({ makes, filters, onChange }) {
  function update(name, value) {
    onChange({ ...filters, [name]: value });
  }

  return (
    <section className="filters" aria-label="Filters">
      <label className="field">
        <span>Make</span>
        <select
          value={filters.make}
          onChange={(e) => update('make', e.target.value)}
        >
          <option value="">All makes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Max price</span>
        <input
          type="number"
          min="0"
          inputMode="numeric"
          placeholder="Any price"
          value={filters.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
        />
      </label>

      <label className="field">
        <span>Sort by</span>
        <select
          value={filters.sort}
          onChange={(e) => update('sort', e.target.value)}
        >
          <option value="">Default</option>
          <option value="mileage">Mileage: low to high</option>
        </select>
      </label>
    </section>
  );
}
