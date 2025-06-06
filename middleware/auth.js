// middleware/auth.js
const auth = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const validkey = process.env.API_KEY;

    if (!apiKey || apiKey !== validKey) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
    }

    next();
};

module.exports = auth;