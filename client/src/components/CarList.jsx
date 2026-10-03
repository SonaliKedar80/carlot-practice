import CarCard from './CarCard.jsx';

export default function CarList({ cars, onContact, favouriteIds, pendingIds, onToggleFavourite }) {
  if (cars.length === 0) {
    return <p className="message">No cars match your search.</p>;
  }

  return (
    <ul className="car-grid">
      {cars.map((car) => (
        <li key={car.id}>
          <CarCard
            car={car}
            onContact={onContact}
            saved={favouriteIds.includes(car.id)}
            saving={pendingIds.includes(car.id)}
            onToggleFavourite={onToggleFavourite}
          />
        </li>
      ))}
    </ul>
  );
}
