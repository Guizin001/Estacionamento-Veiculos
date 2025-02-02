//helpers.js

export const validateVehicleData = (data) => {
    const { licensePlate, model, year } = data;
    const errors = {};

    if (!licensePlate) {
        errors.licensePlate = "Placa é obrigatória.";
    }

    if (!model) {
        errors.model = "Modelo é obrigatório.";
    }

    if (!year || isNaN(year) || year < 1886 || year > new Date().getFullYear()) {
        errors.year = "Ano inválido.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const formatLicensePlate = (plate) => {
    return plate.toUpperCase().replace(/[^A-Z0-9]/g, '');
};