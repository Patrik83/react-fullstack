const express = require("express");
const router = express.Router();
const { Products, Images, Categories } = require("../models"); // Lägg till Categories

// Hämta alla produkter med dess bilder och eventuella kategorier
router.get("/", async (req, res) => {
  try {
    const listOfProducts = await Products.findAll({ 
      include: [{ model: Images }, { model: Categories }] // Inkludera Images och Categories
    });
    res.json(listOfProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Could not fetch products" });
  }
});

// Hämta specifik produkt med dess bilder och eventuella kategorier
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Products.findByPk(productId, { 
      include: [{ model: Images }, { model: Categories }] // Inkludera Images och Categories
    });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Could not fetch product" });
  }
});

router.get("/category/:categoryName", async (req, res) => { // Använd /category/:categoryName istället för /:categoryName
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

// Sök efter produkter vars namn börjar med en viss sökterm
router.get("/search/:searchTerm", async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const products = await Products.findAll({
      where: {
        name: { $iLike: `${searchTerm}%` } // Produktnamn börjar med söktermen (fallkänslig)
        // Om du vill att sökningen ska vara fallkänslig, använd $like istället för $iLike
      },
      include: [{ model: Images }, { model: Categories }] // Inkludera Images och Categories
    });
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Could not search products" });
  }
});

module.exports = router;