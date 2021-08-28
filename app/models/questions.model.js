module.exports = (sequelize, Sequelize) => {
  const Questions = sequelize.define("questions", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    minuendDigits:{
      type: Sequelize.INTEGER
    },
    subtrahendDigits:{
      type: Sequelize.INTEGER
    },
    isBorrow:{
      type: Sequelize.BOOLEAN
    },
    minuend: {
      type: Sequelize.INTEGER
    },
    subtrahend: {
      type: Sequelize.INTEGER
    },
    option1:{
      type: Sequelize.INTEGER
    },
    option2:{
      type: Sequelize.INTEGER
    },
    option3:{
      type: Sequelize.INTEGER
    },
    option4:{
      type: Sequelize.INTEGER
    },
  });

  return Questions;
};
