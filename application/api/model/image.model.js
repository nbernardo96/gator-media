module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define("image", {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    title:{
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    description:{
      allowNull: true,
      type: DataTypes.STRING
    },
    isFree:{
      allowNull: true,
      type: DataTypes.STRING
    },
    user_id:{
      allowNull: true,
      type: DataTypes.INTEGER
    },
    status:{
      allowNull: true,
      type: DataTypes.STRING
    },
    data: {
      type: DataTypes.BLOB("long"),
    },
  });

  return Image;
};
