const express = require("express");
const { Router } = express;
const router = Router();
const fs = require("fs");
const Productos = require("./Productos.js");


router
  .route("/productos")
  .get((req, res) => {
    try {
      Productos.getAll().then((data) => {
        res.send(data);
      });
    } catch (err) {
      console.log(err);
    }
  })
  .post((req, res) => {
    try {
      const newProducto = req.body;
      Productos.save(newProducto);
    } catch (err) {
      console.log(err);
    }
  });

router
  .route("/productos/:id")
  .get((req, res) => {
    try {
      Productos.getById(req.params.id).then((data) => {
        res.send(data);
      });
    } catch (err) {
      console.log(err);
    }
  })

  .put((req, res) => {
    const baseDatos = JSON.parse(
      fs.readFileSync("./listaProductos.json", "utf8")
    );
    try {
      let { modelo, marca, precio, id } = req.body;
      const producto = baseDatos.find((producto) => producto.id === id);
      producto = {
        modelo: modelo,
        marca: marca,
        precio: precio,
      };
      console.log(producto);
    } catch (err) {
      console.log(err);
    }
  })
  .delete((req, res) => {
    try {
      Productos.deletebyId(req.params.id);
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
