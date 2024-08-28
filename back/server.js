// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const sql = require('mssql');
// const cors = require('cors');
// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// const config = {
//     user: 'sa', 
//     password: '1234',
//     server: '127.0.0.1', 
//     database: 'book',
//     synchronize: true,
//     options: {
//         encrypt: false,
//         trustServerCertificate: true,
//         enableArithAbort: true
//     },
//     port : 1433
// };

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
    
//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request()
//             .input('username', sql.Char(255), username)
//             .query('SELECT * FROM Users WHERE username = @username');
        
//         if (result.recordset.length > 0) {
//             const user = result.recordset[0];
//             const isMatch = await bcrypt.compare(password, user.password);

//             if (isMatch) {
//                 const role = user.role.trim(); // Trim role to remove trailing spaces
//                 const token = jwt.sign({ id: user.id, role }, 'your_jwt_secret', { expiresIn: '1h' });
//                 res.json({ token, role, username: user.username });
//             } else {
//                 res.status(400).json({ message: 'Invalid credentials' });
//             }
//         } else {
//             res.status(400).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// app.get('/oil-types', async (req, res) => {
//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request().query(`
//             SELECT 
//                 ot.id, 
//                 ot.name, 
//                 ISNULL(op.price, ot.price) AS price,
//                 ISNULL(CONVERT(VARCHAR, op.date, 23), 'N/A') AS lastUpdate
//             FROM OilTypes ot
//             LEFT JOIN (
//                 SELECT oilId, price, date
//                 FROM OilPrices op
//                 WHERE op.date = (
//                     SELECT MAX(date) 
//                     FROM OilPrices 
//                     WHERE oilId = op.oilId
//                 )
//             ) op ON ot.id = op.oilId
//         `);
//         res.json(result.recordset);
//     } catch (error) {
//         console.error('Error fetching oil types with latest price', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// app.post('/oil-types', async (req, res) => {
//     const { name, price } = req.body;
//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request()
//             .input('name', sql.VarChar, name)
//             .input('price', sql.Float, price)
//             .query('INSERT INTO OilTypes (name, price) OUTPUT INSERTED.* VALUES (@name, @price)');

//         res.json(result.recordset[0]);
//     } catch (error) {
//         console.error('Error adding oil type:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// app.put('/oil-types/:id', async (req, res) => {
//     const { id } = req.params;
//     const { name, price, lastUpdate } = req.body; // Added lastUpdate

//     if (name === undefined || price === undefined || lastUpdate === undefined) {
//         return res.status(400).json({ message: 'Name, price, and last update are required' });
//     }

//     try {
//         const pool = await sql.connect(config);

//         // Update oil type in the database
//         const result = await pool.request()
//             .input('id', sql.Int, id)
//             .input('name', sql.VarChar, name)
//             .input('price', sql.Float, price)
//             .input('lastUpdate', sql.Date, lastUpdate) // Added lastUpdate
//             .query('UPDATE OilTypes SET name = @name, price = @price, lastUpdate = @lastUpdate WHERE id = @id');

//         if (result.rowsAffected[0] === 0) {
//             return res.status(404).json({ message: 'Oil type not found' });
//         }

//         res.json({ message: 'Oil type updated successfully' });
//     } catch (error) {
//         console.error('Error updating oil type:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });




// app.delete('/oil-types/:id', async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         const pool = await sql.connect(config);
//         await pool.request()
//             .input('id', sql.Int, id)
//             .query('DELETE FROM OilTypes WHERE id = @id');
        
//         res.json({ message: 'Oil type deleted successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// app.post('/oil-price', async (req, res) => {
//     const { oilId, price, date } = req.body;

//     try {
//         const pool = await sql.connect(config);

//         // Insert the new price into the OilPrices table
//         await pool.request()
//             .input('oilId', sql.Int, oilId)
//             .input('price', sql.Float, price)
//             .input('date', sql.Date, date)
//             .query('INSERT INTO OilPrices (oilId, price, date) VALUES (@oilId, @price, @date)');

//         // Update the current price in the OilTypes table
//         await pool.request()
//             .input('oilId', sql.Int, oilId)
//             .input('price', sql.Float, price)
//             .query('UPDATE OilTypes SET price = @price WHERE id = @oilId');

//         res.json({ message: 'Price updated successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // เพิ่ม Endpoint อื่นๆ ของระบบ

// app.listen(3001, () => {
//     console.log('Server is running on port 3001');
// });


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const config = {
    user: 'sa', 
    password: '1234',
    server: '127.0.0.1', 
    database: 'book',
    synchronize: true,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    port : 1433
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('username', sql.Char(255), username)
            .query('SELECT * FROM Users WHERE username = @username');
        
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                const role = user.role.trim(); // Trim role to remove trailing spaces
                const token = jwt.sign({ id: user.id, role }, 'your_jwt_secret', { expiresIn: '1h' });
                res.json({ token, role, username: user.username });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(400).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



app.get('/oil-types', async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT 
                ot.id, 
                ot.name, 
                ISNULL(op.price, ot.price) AS price,
                ISNULL(CONVERT(VARCHAR, op.date, 23), 'N/A') AS lastUpdate,
                ot.state -- Include state in the response
            FROM OilTypes ot
            LEFT JOIN (
                SELECT oilId, price, date
                FROM OilPrices op
                WHERE op.date = (
                    SELECT MAX(date) 
                    FROM OilPrices 
                    WHERE oilId = op.oilId
                )
            ) op ON ot.id = op.oilId
        `);
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching oil types with latest price', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/oil-types', async (req, res) => {
    const { name, price, state } = req.body;
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('price', sql.Float, price)
            .input('state', sql.Bit, state)
            .query('INSERT INTO OilTypes (name, price, state) OUTPUT INSERTED.* VALUES (@name, @price, @state)');

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error adding oil type:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




app.put('/oil-types/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, lastUpdate, state } = req.body;

    if (name === undefined || price === undefined || lastUpdate === undefined || state === undefined) {
        return res.status(400).json({ message: 'Name, price, last update, and state are required' });
    }

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('name', sql.VarChar, name)
            .input('price', sql.Float, price)
            .input('lastUpdate', sql.Date, lastUpdate)
            .input('state', sql.Bit, state)
            .query('UPDATE OilTypes SET name = @name, price = @price, lastUpdate = @lastUpdate, state = @state WHERE id = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Oil type not found' });
        }

        res.json({ message: 'Oil type updated successfully' });
    } catch (error) {
        console.error('Error updating oil type:', error);
        res.status(500).json({ message: 'Server error' });
    }
});






app.delete('/oil-types/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const pool = await sql.connect(config);
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM OilTypes WHERE id = @id');
        
        res.json({ message: 'Oil type deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/oil-price', async (req, res) => {
    const { oilId, price, date } = req.body;

    try {
        const pool = await sql.connect(config);

        // Insert the new price into the OilPrices table
        await pool.request()
            .input('oilId', sql.Int, oilId)
            .input('price', sql.Float, price)
            .input('date', sql.Date, date)
            .query('INSERT INTO OilPrices (oilId, price, date) VALUES (@oilId, @price, @date)');

        // Update the current price in the OilTypes table
        await pool.request()
            .input('oilId', sql.Int, oilId)
            .input('price', sql.Float, price)
            .query('UPDATE OilTypes SET price = @price WHERE id = @oilId');

        res.json({ message: 'Price updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// เพิ่ม Endpoint อื่นๆ ของระบบ

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});