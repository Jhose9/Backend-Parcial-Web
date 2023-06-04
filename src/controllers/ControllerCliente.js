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

const UpdateCliente = (req, res) => {
  try {
    const { nombre, correo, nacionalidad, caso, sexo, edad } = req.body;

    pool.query(
      `UPDATE clientes SET nombre = "${nombre}", correo = "${correo}", nacionalidad = "${nacionalidad}", caso = "${caso}", sexo = "${sexo}", edad = ${edad} WHERE cedula = ${req.params.cedula} `
    );

    res.status(200).json({ ok: true, msg: "actualizo" });
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
