const express = require("express");
const router = express.Router();
const { Products, Images, Categories, ProductCategories } = require("../models");

/* *************************************************************** */
/* ************************* GET PRODUCTS ************************ */
/* *************************************************************** */

// Hämta alla produkter (HomePage.js)
router.get("/products", async (req, res) => {

  try {
    const products = await Products.findAll({ 
      include: [{ model: Images }, { model: Categories, as: 'Categories' }]
    });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// Hämta en specifik produkt (ProductDetailPage.js)
router.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findByPk(productId, { 
      include: [{ model: Images }, { model: Categories }]
    });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Could not fetch product" });
  }
});

// Hämta alla kategorier (search.js)
router.get("/categories", async (req, res) => {

  try {
    const categories = await Categories.findAll({
      attributes: ['name', 'id'],
    });

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Could not fetch categories" });
  }
});

// Hämta produkter efter kategori (används av ApiService.js till Search.js)
router.get("/categories/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;

  try {
    // Hämta alla produkter som tillhör den angivna kategorin från databasen
    const productsInCategory = await Products.findAll({
      include: [
        { model: Categories, where: { name: categoryName } }, { model: Images }]
    });
    res.json(productsInCategory);
  } catch (error) {
    console.error("Error fetching products from category:", error);
    res.status(500).json({error: "Could not fetch products from category" });
  }
});

/* *************************************************************** */
/* *********************** UPDATE PRODUCTS *********************** */
/* *************************************************************** */

// Uppdaterar namn, pris och kategori genom admin sidan
router.put("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { name, price, categoryId } = req.body;

  try {
    // Uppdatera name och price i tabellen products
    const productResult = await Products.update(
      { name: name, price: price },
      { where: { id: productId } }
    );

    // Kontrollera om produkten uppdaterades
    if (productResult[0] === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Uppdatera categoryId i tabellen product_categories
    const categoryResult = await ProductCategories.update(
      { categoryId: categoryId },
      { where: { productId: productId } }
    );

    // Kontrollera om produktkategorin uppdaterades
    if (categoryResult[0] === 0) {
      return res.status(404).json({ error: "Product category not found" });
    }

    res.json({ message: "Product and category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;