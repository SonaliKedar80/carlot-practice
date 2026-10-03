import { formatPrice, formatMileage } from '../utils/format.js';

export default function CarCard({ car, onContact }) {
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

        <button type="button" className="button" onClick={() => onContact(car)}>
          Contact seller
        </button>
      </div>
    </article>
  );
}
