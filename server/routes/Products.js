const express = require("express");
const router = express.Router();
const { Products, Images, Categories } = require("../models");

// Hämta alla produkter med dess bilder och eventuella kategorier
router.get("/products", async (req, res) => {
  try {
    const listOfProducts = await Products.findAll({ 
      include: [{ model: Images }, { model: Categories }] // Inkludera tabellerna images och categories
    });
    res.json(listOfProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// Hämta en specifik produkt med dess bilder och eventuella kategorier
router.get("/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findByPk(productId, { 
      include: [{ model: Images }, { model: Categories }] // Inkludera tabellerna images och categories
    });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Could not fetch product" });
  }
});

// Hämta alla kategorier
router.get("/categories", async (req, res) => {
  try {
    const listOfCategoryNames = await Categories.findAll({
      attributes: ['name'], // Endast hämta namnen på kategorierna
    });

    res.json(listOfCategoryNames);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Could not fetch categories" });
  }
});

// Hämta produkter efter kategori
router.get("/categories/:categoryName", async (req, res) => {
  const categoryName = req.params.categoryName;
  console.log("Received category name:", categoryName);
  try {
    // Hämta alla produkter som tillhör den angivna kategorin från databasen
    const productsInCategory = await Products.findAll({
      include: [
        { model: Categories, where: { name: categoryName } }, { model: Images }] // Inkludera tabellerna images och categories
    });
    res.json(productsInCategory);
  } catch (error) {
    console.error("Error fetching products from category:", error);
    res.status(500).json({error: "Could not fetch products from category" });
  }
});

// Hämta en specifik produkt inom en viss kategori
router.get("/categories/:categoryName/:productName", async (req, res) => {
  const { categoryName, productName } = req.params;
  console.log("Received category name:", categoryName);
  console.log("Received product name:", productName);
  try {
    // Hämta den specifika produkten som tillhör den angivna kategorin från databasen
    const product = await Products.findOne({
      include: [
        { 
          model: Categories, 
          where: { name: categoryName } 
        }, 
        { model: Images }
      ],
      where: { name: productName }
    });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product from category:", error);
    res.status(500).json({error: "Could not fetch product from category" });
  }
});

module.exports = router;