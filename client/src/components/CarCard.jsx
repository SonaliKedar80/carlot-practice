import { formatPrice, formatMileage } from '../utils/format.js';

export default function CarCard({ car, onContact, saved, saving, onToggleFavourite }) {
  return (
    <article className="car-card">
      <div className="car-photo" aria-hidden="true">
        {car.make.charAt(0)}
      </div>

      <div className="car-body">
        <h2>
          {car.year} {car.make} {car.model}
        </h2>
        <p className="car-price">{formatPrice(car.price)}</p>

        <dl className="car-specs">
          <div>
            <dt>Mileage</dt>
            <dd>{formatMileage(car.mileage)}</dd>
          </div>
          <div>
            <dt>Fuel</dt>
            <dd>{car.fuel}</dd>
          </div>
          <div>
            <dt>Gearbox</dt>
            <dd>{car.transmission}</dd>
          </div>
        </dl>

        <p className="car-location">{car.location}</p>

        <div className="car-actions">
          <button type="button" className="button" onClick={() => onContact(car)}>
            Contact seller
          </button>
          <button
            type="button"
            className={saved ? 'button button-saved' : 'button button-light'}
            aria-pressed={saved}
            disabled={saving}
            onClick={() => onToggleFavourite(car)}
          >
            {saved ? 'Saved' : 'Save to favourites'}
          </button>
        </div>
      </div>
    </article>
  );
}
