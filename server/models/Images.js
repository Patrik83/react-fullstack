module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define("Images", {
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Images.associate = (models) => {
        Images.belongsTo(models.Products);
    };

    return Images;
};
