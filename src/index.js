import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import clientes from './routes/Clientes.routes.js';
const app = express();
dotenv.config();

const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.use("/api/v1",clientes)




app.listen(port,()=>{
    console.log(`en puerto ${port} `);
});