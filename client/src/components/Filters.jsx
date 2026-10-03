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
    </section>
  );
}
