const fs = require("fs");

const baseDatos = JSON.parse(fs.readFileSync("./listaProductos.json", "utf-8"));

class Productos {
  constructor(producto) {
    this.listaProductos = producto;
  }


  async save(obj) {
    let id = 0;
    try {
      const data = JSON.parse(
        await fs.promises.readFile("./listaProductos.json", "utf-8")
      );
      let listaProductos = data;
      listaProductos.push(obj);

      listaProductos.forEach((producto) => {
        if (producto.id > id) {
          id = producto.id;
        }
      });
      obj.id = id + 1;
      fs.writeFileSync(
        "./listaProductos.json",
        JSON.stringify(listaProductos, null, 2)
      );
      fs.writeFileSync(
        "./listaProductos.txt",
        JSON.stringify(listaProductos, null, 2)
      );
    } catch (err) {
      console.error(err);
    }
  }

  static async getById(idNumber) {
   
    idNumber = parseInt(idNumber);

    try {

      let data;
      let producto;
      
      data = JSON.parse(
        await fs.promises.readFile("./listaProductos.json", "utf-8")
      );
      
      this.listaProductos = data;
      

      producto = this.listaProductos.filter(
        (producto) => producto.id == idNumber
      );
      
      if (producto) {
        console.log(`Requested product ${JSON.stringify(producto)}`);
      
        return JSON.stringify(producto);

      } 

      else {
        console.log("No existe producto con ese id asignado");
      }

    } 

    catch (err) {
      console.log(err);
    }

  }

  async getAll() {
    try {
      const data = JSON.parse(
        await fs.promises.readFile("./listaProductos.json", "utf-8")
      );
      let productos = data;
      if (productos.length > 0) {
        const listaCompleta = productos.map((producto) => producto);
      } else {
        console.log("No hay productos");
      }
    } catch (err) {
      console.log(err);
    }
  }



  static async getAll() {
    try {

      let data;

      data = JSON.parse(
        await fs.promises.readFile("./listaProductos.json", "utf-8")
      );
      
      return data;

    }

    catch (err) {
      console.error(err);
    }

  }


  async deleteById(idNumber) {
    try {
      const data = JSON.parse(
        await fs.promises.readFile("./listaProductos.json", "utf-8")
      );
      this.listaProductos = data;
      let producto = this.listaProductos.filter(
        (producto) => producto.id === idNumber
      );
      if (producto) {
        this.listaProductos.splice(this.listaProductos.indexOf(producto));
        fs.writeFileSync(
          "./listaProductos.json",
          JSON.stringify(this.listaProductos, null, 2)
        );
        fs.writeFileSync(
          "./listaProductos.txt",
          JSON.stringify(this.listaProductos, null, 2)
        );
        console.log(`el producto con id ${idNumber} fue eliminado`);
      } else {
        console.log("No existe producto con ese id asignado");
      }
    } catch (err) {
      console.log(err);
    }
  }


  async deleteAll() {
    try {
      const data = JSON.parse(
        await fs.promises.readFile("./listaProductos.json", "utf-8")
      );
      let productos = data;
      if (productos.length > 0) {
        const listaCompleta = productos.map((producto) => producto);
        listaCompleta.splice(0, listaCompleta.length);
        fs.writeFileSync(
          "./listaProductos.json",
          JSON.stringify(listaCompleta, null, 2)
        );
        fs.writeFileSync(
          "./listaProductos.txt",
          JSON.stringify(listaCompleta, null, 2)
        );
      } else {
        console.log("No hay productos");
      }
    } catch (err) {
      console.log(err);
    }
  }
}
const productos = new Productos(baseDatos);

module.exports = Productos;
