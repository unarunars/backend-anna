const { query } = require('../db');

//Sækir allar staðsetningar
async function getMap() {
    try {
        const text = 'SELECT * FROM map';
        const results = await query(text);
        return results.rows;
    } catch (e) {
        console.error('Villa:', e.message);
        return;
    }
}
module.exports = {
    getMap
};