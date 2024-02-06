const express = require("express");
const router = express.Router();
const { Products, Images } = require("../models");

// Hämta alla produkter med deras bilder
router.get("/", async (req, res) => {
  // Hittar alla produkter från product tabellen och includerar image tabellen i databasen
  const listOfProducts = await Products.findAll({ include: Images });
  res.json(listOfProducts);
});

// Hämta specifika produkter med deras bilder
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId
  const product = await Products.findByPk(productId, { include: Images });
  res.json(product);
})

// Skapa en ny produkt med bilder som är kopplade till den
router.post("/", async (req, res) => {
  const { name, price } = req.body;
  const images = req.body.images; // Skicka bilderna i en separat array

  try {
    const newProduct = await Products.create({ name, price });

    if (images?.length > 0) {
      await Promise.all(images.map(async (imageUrl) => {
        await Images.create({ imageUrl, ProductId: newProduct.id });
      }));
    }

    res.json(newProduct);
  } catch (error) {
    console.error('Fel vid skapande av produkt:', error);
    res.status(500).json({ error: 'Ett fel uppstod vid skapande av produkten.' });
  }
});

module.exports = router;
