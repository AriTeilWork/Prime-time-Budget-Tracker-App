function Balance({ balance }) {
  return (
    <div className="balance-box">
      <h3>Saldo</h3>
      <div id="balance">{balance}€</div>
    </div>
  );
}

export default Balance;
