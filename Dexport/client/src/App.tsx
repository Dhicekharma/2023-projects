import React, { useState } from 'react';
import axios from 'axios';

function App(): JSX.Element {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [fuelPrice, setFuelPrice] = useState<number>(0);
  const [fuelConsumption, setFuelConsumption] = useState<number>(0);
  const [driverFee, setDriverFee] = useState<number>(0);
  const [companyProfit, setCompanyProfit] = useState<number>(0);
  const [fare, setFare] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post('/move/calculate', {
        origin,
        destination,
        fuelPrice,
        fuelConsumption,
        driverFee,
        companyProfit,
      });

      setFare(response.data.fare);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Calculate Moving Fare</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Origin:
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </label>
        <br />
        <label>
          Destination:
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </label>
        <br />
        <label>
          Fuel Price:
          <input type="number" value={fuelPrice} onChange={(e) => setFuelPrice(parseFloat(e.target.value))} />
        </label>
        <br />
        <label>
          Fuel Consumption (km/L):
          <input type="number" value={fuelConsumption} onChange={(e) => setFuelConsumption(parseFloat(e.target.value))} />
        </label>
        <br />
        <label>
          Driver Fee:
          <input type="number" value={driverFee} onChange={(e) => setDriverFee(parseFloat(e.target.value))} />
        </label>
        <br />
        <label>
          Company Profit:
          <input type="number" value={companyProfit} onChange={(e) => setCompanyProfit(parseFloat(e.target.value))} />
        </label>
        <br />
        <button type="submit">Calculate Fare</button>
      </form>
      <br />
      {fare !== 0 && (
        <div>
          <h2>Fare: {fare.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
