import express from "express";
import mysql from 'mysql';

//Componentes para __dirname
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as authentication } from "./controllers/authentication.controller.js"; 

//Conexión a la base de datos

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login',
});

// Servidor
const app = express();
app.set("port",4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());

//Rutas o endpoints
app.get("/",(req,res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/register",(req,res)=> res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin",(req,res)=> res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login", authentication.login);
app.post("/api/register", authentication.register);

export {pool}