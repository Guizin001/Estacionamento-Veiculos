import React, { useState, useEffect } from 'react';
import VehicleForm from './VehicleForm';
import Popup from './Popup';
import { getStoredVehicles, addVehicle, removeVehicle } from './VehicleManager';
import '../styles/dashboard.css'; // Importando o arquivo CSS

const Dashboard = ({ settings }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedVehicles = getStoredVehicles().map(vehicle => ({
      ...vehicle,
      timeElapsed: Date.now() - vehicle.timestamp
    }));
    setVehicles(storedVehicles);
    setFilteredVehicles(storedVehicles);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVehicles(prevVehicles => prevVehicles.map(vehicle => ({
        ...vehicle,
        timeElapsed: Date.now() - vehicle.timestamp
      })));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setFilteredVehicles(
      vehicles.filter(
        (vehicle) =>
          vehicle.cpf.toLowerCase().includes(searchTerm) ||
          vehicle.plate.toLowerCase().includes(searchTerm)
      )
    );
  }, [vehicles, searchTerm]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const handleSuccess = (vehicle) => {
    try {
      addVehicle(vehicle);
      setSuccessMessage('Veículo cadastrado com sucesso!');
      setTimeout(() => setSuccessMessage(''), 3000);
      const storedVehicles = getStoredVehicles().map(vehicle => ({
        ...vehicle,
        timeElapsed: Date.now() - vehicle.timestamp
      }));
      setVehicles(storedVehicles);
      setShowPopup(false);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(''), 3000);
  };

  const handleRemoveVehicle = (id) => {
    removeVehicle(id);
    const storedVehicles = getStoredVehicles().map(vehicle => ({
      ...vehicle,
      timeElapsed: Date.now() - vehicle.timestamp
    }));
    setVehicles(storedVehicles);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
  };
  
  const calculateCost = (milliseconds) => {
    const hours = Math.ceil(milliseconds / (1000 * 60 * 60));
    return hours * 10;
  };

  const handlePayment = (vehicleId) => {
    // Função para lidar com o pagamento, futuramente será linkada à API do Mercado Pago
    console.log(`Pagamento iniciado para o veículo com ID: ${vehicleId}`);
  };
  
  const renderVehicles = () => {
    if (filteredVehicles.length === 0) {
      return <p className="text-center text-gray-500">Nenhum veículo cadastrado.</p>;
    }
    return filteredVehicles.map(vehicle => (
      vehicle && (
        <div className="card bg-white rounded-lg p-5 text-center shadow-md relative" key={vehicle.id}>
          <button className="absolute top-2 right-2 bg-red-600 text-white text-lg rounded-full w-8 h-8 flex items-center justify-center" onClick={() => handleRemoveVehicle(vehicle.id)}>&times;</button>
          <h3 className="text-xl font-semibold mb-4">Veículo: {vehicle.model}</h3>
          <div className="vehicle-info">
            <p><strong>CPF:</strong> {vehicle.cpf}</p>
            <p><strong>Placa:</strong> {vehicle.plate}</p>
            <p><strong>Cor:</strong> {vehicle.color}</p>
            <p><strong>Tempo:</strong> {formatTime(vehicle.timeElapsed)}</p>
            <button 
              className="payment-button bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 hover:bg-blue-500"
              onClick={() => handlePayment(vehicle.id)}
            >
             Pagar: R$ {calculateCost(vehicle.timeElapsed)},00
            </button>
          </div>
        </div>
      )
    ));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="sidebar bg-gray-800 text-white w-64 p-5 flex flex-col justify-between">
        <h2 className="text-2xl mb-5">SysCad</h2>
      </nav>
      <div className="flex flex-col flex-grow">
        <header className="header flex justify-between items-center p-5 bg-white shadow-md">
          <h1 className="text-3xl text-gray-800">Estacionamento</h1>
        </header>
        <div className="informs content p-5 bg-white overflow-y-auto flex-grow">
          <div className="informs">
            <button id="button-dash" className="bg-orange-600 text-white py-3 px-4 rounded-lg text-left hover:bg-orange-500" onClick={() => setShowPopup(true)}>Cadastro de Veículos</button>
            <input 
              type="text" 
              placeholder="Pesquisar por CPF ou Placa..." 
              className="p-2 text-lg border border-gray-300 rounded-lg w-72" 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {renderVehicles()}
          </div>
        </div>
      </div>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <VehicleForm onSuccess={handleSuccess} onError={handleError} />
        </Popup>
      )}
      {successMessage && <div className="success-message fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-lg shadow-md">{successMessage}</div>}
      {errorMessage && <div className="error-message fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-3 rounded-lg shadow-md">{errorMessage}</div>}
    </div>
  );
};

export default Dashboard;