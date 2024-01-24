import { pool } from '../index.js';

//Función para realizar el login
async function login(req, res) {
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;

    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    // Esta parte verifica si el usuario ya existe en la base de datos, si no existe muestra error
    const query = `SELECT * FROM usuarios WHERE user = ? AND password = ?`;
    pool.query(query, [user, password], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ status: "Error", message: "Error en el servidor" });
        }

        if (results.length === 0) {
            return res.status(400).send({ status: "Error", message: "Error al ingresar. Usuario o contraseña incorrectos" });
        }

        res.send({ status: "ok", message: "Usuario logueado", redirect: "/admin" });
    });
}

//Funcion para registrar un nuevo usuario
async function register(req, res) {
    const email = req.body.email;
    const user = req.body.user;
    const password = req.body.password;

    if (!user || !password || !email) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    // Verificar si el usuario ya existe en la base de datos
    const query = `SELECT * FROM usuarios WHERE user = ?`;
    pool.query(query, [user], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ status: "Error", message: "Error en el servidor" });
        }

        if (results.length > 0) {
            return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
        }

        // Insertar nuevo usuario en la base de datos
        const insertQuery = `INSERT INTO usuarios (user, email, password) VALUES (?, ?, ?)`;
        pool.query(insertQuery, [user, email, password], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ status: "Error", message: "Error en el servidor" });
            }

            res.status(201).send({ status: "ok", message: "Usuario agregado", redirect: "/", showAlert: true });
        });
    });
}

export const methods = {
    login,
    register
}