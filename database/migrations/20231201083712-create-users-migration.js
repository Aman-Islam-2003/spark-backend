"use strict";
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const table = "users";
const name = "Aman Islam";
const email = "aman@gmail.com";
const createdAt = moment().unix();
const updatedAt = moment().unix();
const plainPassword = "amanislam";

module.exports = {
  up: async function (queryInterface) {
    await queryInterface.createTable(table, {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 128],
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await queryInterface.bulkInsert(
      table,
      [
        {
          email,
          password: hashedPassword,
          name,
          createdAt,
          updatedAt,
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  },
};
