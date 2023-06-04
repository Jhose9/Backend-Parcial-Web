import pool from "../config/database.js";

const GetClienteByCedula = async (req, res) => {
  try {
    const [data] = await pool.query(
      `SELECT * FROM clientes WHERE cedula = ${req.params.cedula}`
    );
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 404, ok: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error de servidor" });
  }
};

const GetAllClientes = async (req, res) => {
  try {
    const [data] = await pool.query(`SELECT * FROM clientes`);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 404, ok: false });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error del servidor" });
  }
};

const UpdateCliente = async (req, res) => {
  try {
    const { nombre, correo, nacionalidad, caso, sexo, edad } = req.body;

    const [results] = await pool.query(`SELECT * FROM clientes WHERE cedula = ${req.params.cedula}`);

    const clienteActual = results[0]; 
    
    const nuevoNombre = nombre !== undefined ? nombre : clienteActual.nombre;
    const nuevoCorreo = correo !== undefined ? correo : clienteActual.correo;
    const nuevaNacionalidad = nacionalidad !== undefined ? nacionalidad : clienteActual.nacionalidad;
    const nuevoCaso = caso !== undefined ? caso : clienteActual.caso;
    const nuevoSexo = sexo !== undefined ? sexo : clienteActual.sexo;
    const nuevaEdad = edad !== undefined ? edad : clienteActual.edad;


    if (nombre !== undefined || correo !== undefined || nacionalidad !== undefined || caso !== undefined || sexo !== undefined || edad !== undefined) {
      await pool.query(
        `UPDATE clientes SET nombre = "${nuevoNombre}", correo = "${nuevoCorreo}", nacionalidad = "${nuevaNacionalidad}", caso = "${nuevoCaso}", sexo = "${nuevoSexo}", edad = ${nuevaEdad} WHERE cedula = ${req.params.cedula}`
      );

      res.status(200).json({ ok: true, msg: "actualizado" });
    } else {
      res.status(200).json({ ok: true, msg: "sin cambios en los campos" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error del servidor" });
  }
};


const DeleteCliente = (req, res) => {
  try {
    pool.query(`DELETE FROM clientes WHERE cedula = ${req.params.cedula}`);
    res.json({ ok: true, msg: "se elimino el clientes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error del servidor" });
  }
};

const PostCliente = (req, res) => {
  try {
    const { nombre, cedula, correo, nacionalidad, caso, sexo, edad } =
      req.body;
    if (
      !nombre ||
      !cedula ||
      !correo ||
      !nacionalidad ||
      !caso ||
      !sexo ||
      !edad
    ) {
      res.status(400).json({ ok: false, msg: "error al ingresar datos" });
    }
    pool.query(`INSERT INTO clientes (nombre, cedula, correo, nacionalidad, caso, sexo, edad) 
    VALUES("${nombre}", "${cedula}", "${correo}", "${nacionalidad}", "${caso}", "${sexo}", ${edad})`);
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    console.log(nombre, cedula, correo, nacionalidad, caso, sexo, edad);
  }
};

export default {
  GetClienteByCedula,
  GetAllClientes,
  UpdateCliente,
  DeleteCliente,
  PostCliente,
};
