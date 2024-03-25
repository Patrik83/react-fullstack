module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    });

    Products.associate = (models) => {
        Products.hasMany(models.Images);
        Products.belongsToMany(models.Categories, { through: 'product_categories' });
    };

    return Products;
};