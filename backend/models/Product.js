const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const Word = db.define("Product", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM,
        values: ['Gesso', 'Resina'],
        allowNull: false
    }
});

module.exports = Word;
