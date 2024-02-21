const Sequelize = require("sequelize");

const Product = require("../models/Product");

class ProductController {
    static async createProduct(req, res) {
        try {
            const { quantity, description, value } = req.body;
            const newProduct = await Product.create({
                quantity,
                description,
                value,
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllProducts(req, res) {
        try {
            const allProducts = await Product.findAll();
            res.status(200).json(allProducts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (product === null) {
                res.status(404).json({ error: "Product not found" });
            } else {
                res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { quantity, description, value } = req.body;
            const product = await Product.findByPk(id);
            if (product === null) {
                res.status(404).json({ error: "Product not found" });
            } else {
                product.quantity = quantity;
                product.description = description;
                product.value = value;
                await product.save();
                res.status(200).json(product);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);
            if (product === null) {
                res.status(404).json({ error: "Product not found" });
            } else {
                await product.destroy();
                res.status(204).end();
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductsByType(req, res) {
        try {
            const { type } = req.params;
            const products = await Product.findAll({ where: { type } });
            if (products.length === 0) {
                res.status(404).json({ error: "Products not found" });
            } else {
                res.status(200).json(products);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;