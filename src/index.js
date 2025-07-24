const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();
// create and config server
const server = express(); // nombre del servidor
server.use(cors());
server.use(express.json());





// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


   const getConnection = async () =>{
    return await mysql.createConnection({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.PORT
    })
 };  
  async function testConnection() {
  const connection = await getConnection();
  console.log(`Conexión establecida con la base de datos (identificador=${connection.threadId})`);
  await connection.end();
}
 
testConnection();  


 



// server es el nombre del servidor (puede ser app, por ejemplo)
server.get("/movies", async (request, response) => {
    const connection = await getConnection();
    const [results] = await connection.query('SELECT * FROM movies')
    connection.end()

  response.status(200).json(
    {
      success: true,
      movies: results
    }
  );
 
})


