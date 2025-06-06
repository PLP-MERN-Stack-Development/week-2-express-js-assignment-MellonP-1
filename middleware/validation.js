const { ValidationError} = require('../errors/ValidationError');

const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;

    if (!name || !description || typeof price !== 'number' || !category || typeof inStock !== 'boolean') {
        throw new ValidationError('Invalid product data. Please ensure all fields are provided and correct.');}
    if (name.length < 3 || description.length < 10) {
        throw new ValidationError('Name must be at least 3 characters and description at least 10 characters long.');
    }

    next();
};

module.exports = validateProduct;