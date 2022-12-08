const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('series', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fechadeEstreno: {
      type: DataTypes.DATE
    },
    estrellas: {
      type: DataTypes.FLOAT,
      allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
},
precioAlquiler: {
  type: DataTypes.FLOAT,
  allowNull: false,
},
  atp: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
},
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
  }})};
