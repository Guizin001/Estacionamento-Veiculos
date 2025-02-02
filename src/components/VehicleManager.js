export const getStoredVehicles = () => {
  return JSON.parse(localStorage.getItem('vehicles')) || [];
};

export const saveVehicles = (vehicles) => {
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
};

export const isCpfUnique = (cpf, vehicles) => {
  return !vehicles.some(vehicle => vehicle.cpf === cpf);
};

export const isPlateUnique = (plate, vehicles) => {
  return !vehicles.some(vehicle => vehicle.plate === plate);
};

export const validatePlate = (plate) => {
  const plateRegex = /^[A-Z]{3}-\d[A-Z0-9]\d{2}$/;
  return plateRegex.test(plate);
};

export const validateCpf = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.charAt(9))) {
    return false;
  }
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  return remainder === parseInt(cpf.charAt(10));
};

export const addVehicle = (vehicle) => {
  const vehicles = getStoredVehicles();
  if (!validateCpf(vehicle.cpf)) {
    throw new Error('CPF inválido.');
  }
  if (!isCpfUnique(vehicle.cpf, vehicles)) {
    throw new Error('CPF já cadastrado.');
  }
  if (!isPlateUnique(vehicle.plate, vehicles)) {
    throw new Error('Placa já cadastrada.');
  }
  if (!validatePlate(vehicle.plate)) {
    throw new Error('Placa inválida.');
  }
  vehicles.push(vehicle);
  saveVehicles(vehicles);
};

export const removeVehicle = (id) => {
  let vehicles = getStoredVehicles();
  vehicles = vehicles.filter(vehicle => vehicle.id !== id);
  saveVehicles(vehicles);
};