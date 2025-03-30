// ShopPage.jsx
import React, { useState, useEffect, useContext } from "react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCartContext from "./ShoppingCartContext";

export default function ShopPage() {
    const api = "https://fakestoreapi.com/products/";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quantities, setQuantities] = useState({});
    const { setCart } = useContext(ShoppingCartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(api);
                if (!response.ok) {
                    throw new Error(
                        "Something went wrong with fetching the data"
                    );
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading products...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>Couldn't fetch products at this moment...</h1>
                <p>{error}</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div>
                <h1>No data fetched.</h1>
            </div>
        );
    }

    const handleIncrementProduct = (productId) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const handleDecrementProduct = (productId) => {
        setQuantities((prev) => ({
            ...prev,
            [productId]:
                prev[productId] && prev[productId] > 0
                    ? prev[productId] - 1
                    : 0,
        }));
    };

    const handleInputChange = (e, productId) => {
        const value = parseInt(e.target.value, 10);
        setQuantities((prev) => ({
            ...prev,
            [productId]: isNaN(value) ? 0 : value,
        }));
    };

    const handleSubmit = (e, product) => {
        e.preventDefault();

        const selectedQuantity = quantities[product.id] || 0;

        if (selectedQuantity <= 0) return;

        setCart((prevCart) => {
            const existingProduct = prevCart.find(
                (item) => item.id === product.id
            );

            if (existingProduct) {
                const updatedCart = prevCart.map((item) => {
                    if (item.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + selectedQuantity,
                        };
                    }
                    return item;
                });
                return updatedCart;
            } else {
                const newProductEntry = {
                    ...product,
                    quantity: selectedQuantity,
                };
                return [...prevCart, newProductEntry];
            }
        });
    };

    return (
        <div className="shop-container">
            <h1>Products</h1>
            <div className="all-products-container">
                {products.map((product) => (
                    <div key={product.id} className="product-container">
                        <div className="product-image-container">
                            <img src={product.image} alt={product.title} />
                        </div>
                        <h2>{product.title}</h2>
                        <p>{product.price} NOK</p>
                        <form
                            className="controls-container"
                            onSubmit={(e) => handleSubmit(e, product)}
                        >
                            <div className="quantity-controls">
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={quantities[product.id] || 0}
                                    onChange={(e) =>
                                        handleInputChange(e, product.id)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleIncrementProduct(product.id)
                                    }
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDecrementProduct(product.id)
                                    }
                                >
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                            </div>
                            <button type="submit" className="add-to-cart-btn">
                                Add to cart
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
