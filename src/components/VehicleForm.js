import React, { useState } from 'react';

const VehicleForm = ({ onSuccess, onError }) => {
  const [model, setModel] = useState('');
  const [cpf, setCpf] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');

  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(value);
  };

  const handlePlateChange = (e) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length > 7) value = value.slice(0, 7);
    value = value.replace(/^([A-Z]{3})(\d)/, '$1-$2');
    setPlate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicle = {
      id: Date.now(),
      model,
      cpf,
      plate,
      color,
      timestamp: Date.now(),
      timeElapsed: 0,
    };
    try {
      onSuccess(vehicle);
    } catch (error) {
      onError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="model">
          Modelo do Veículo
        </label>
        <input
          id="model"
          type="text"
          placeholder="Ex: Toyota Corolla"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
          CPF
        </label>
        <input
          id="cpf"
          type="text"
          placeholder="Ex: 123.456.789-00"
          value={cpf}
          onChange={handleCpfChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plate">
          Placa
        </label>
        <input
          id="plate"
          type="text"
          placeholder="Ex: ABC-1234"
          value={plate}
          onChange={handlePlateChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
          Cor
        </label>
        <input
          id="color"
          type="text"
          placeholder="Ex: Preto"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div id="button-popup" className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cadastrar Veículo
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;