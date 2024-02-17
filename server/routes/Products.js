const express = require("express");
const router = express.Router();
const { Products, Images } = require("../models");

// Hämta alla produkter med dess bilder
router.get("/", async (req, res) => {
  // Hittar alla produkter från product tabellen och includerar image tabellen i databasen
  const listOfProducts = await Products.findAll({ include: Images });
  res.json(listOfProducts);
});

// Hämta specifika produkter med dess bilder
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId
  const product = await Products.findByPk(productId, { include: Images });
  res.json(product);
})

module.exports = router;
