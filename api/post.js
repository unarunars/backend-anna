
const { query } = require('../db');

async function setMap(req) {
    console.log(req.body);
    try {
        console.log("halló??");
        const text = 'INSERT INTO map (about, size) VALUES ($1, $2);';
        const values = [req.body.about, req.body.size];
        const results = await query(text, values);
        return results;
    } catch (e) {
        console.error('Villa:', e.message);
        return false;
    }
}
module.exports = {
    setMap
};