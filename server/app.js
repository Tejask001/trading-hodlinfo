const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// PostgreSQL connection setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Flag to ensure data is only saved once
let isDataSaved = false;

const createTableIfNotExists = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS coins (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            base_unit VARCHAR(10) NOT NULL,
            volume DECIMAL,
            sell DECIMAL,
            buy DECIMAL,
            last DECIMAL
        );
    `;
    try {
        const client = await pool.connect();
        await client.query(createTableQuery);
        client.release();
        console.log("Table 'coins' ensured.");
    } catch (error) {
        console.error("Error creating table: ", error);
    }
};

const fetchData = async () => {
    try {
        const response = await axios.get("https://api.wazirx.com/api/v2/tickers");
        return response.data;
    } catch (error) {
        console.log("Error while fetching API: ", error);
        return null;
    }
}

const saveCoinsToDB = async (coins) => {
    try {
        const client = await pool.connect();
        await client.query('BEGIN');
        const insertQuery = `
            INSERT INTO coins (name, base_unit, volume, sell, buy, last) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            ON CONFLICT (name) DO UPDATE 
            SET base_unit = EXCLUDED.base_unit, volume = EXCLUDED.volume, sell = EXCLUDED.sell, buy = EXCLUDED.buy, last = EXCLUDED.last;
        `;

        for (const coin of coins) {
            await client.query(insertQuery, [coin.name, coin.base_unit, coin.volume, coin.sell, coin.buy, coin.last]);
        }

        await client.query('COMMIT');
        client.release();
    } catch (error) {
        console.log("Error while saving data to database: ", error);
        throw error;
    }
}

const getCoinsFromDB = async () => {
    try {
        const result = await pool.query('SELECT * FROM coins ORDER BY id LIMIT 10');
        return result.rows;
    } catch (error) {
        console.log("Error while fetching data from database: ", error);
        throw error;
    }
}

app.get("/coins", async (req, res) => {
    try {
        const coinsFromDB = await getCoinsFromDB();
        res.json(coinsFromDB);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


createTableIfNotExists().then(async () => {
    if (!isDataSaved) {
        const data = await fetchData();
        if (data) {
            const top10Coins = Object.values(data).slice(0, 10).map(coin => ({
                name: coin.name,
                base_unit: coin.base_unit,
                volume: coin.volume,
                sell: coin.sell,
                buy: coin.buy,
                last: coin.last
            }));
            await saveCoinsToDB(top10Coins);
            isDataSaved = true;
            console.log("Top 10 coins data saved to database.");
        }
    }
    app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
    });
});
