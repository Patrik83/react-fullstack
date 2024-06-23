module.exports = (sequelize, DataTypes) => {
    const ProductCategories = sequelize.define("ProductCategories", {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        }
      },
    }, {
      tableName: 'product_categories'
    });
  
    return ProductCategories;
  };