function Card({ children }) {
  return (
    <div className="card-component-container">
      <div className="card-component-body">{children}</div>
    </div>
  );
}

export default Card;
