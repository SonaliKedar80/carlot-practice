import CarCard from './CarCard.jsx';

export default function CarList({ cars, onContact }) {
  if (cars.length === 0) {
    return <p className="message">No cars match your search.</p>;
  }

  return (
    <ul className="car-grid">
      {cars.map((car) => (
        <li key={car.id}>
          <CarCard car={car} onContact={onContact} />
        </li>
      ))}
    </ul>
  );
}
