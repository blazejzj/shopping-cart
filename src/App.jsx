import { useState, useEffect } from "react";

const App = () => {
    const api = "https://fakestoreapi.com/products/";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return (
        <div>
            <h1>Heres your data!</h1>
            {products.map((product) => {
                return (
                    <div key={product.id}>
                        <p>Title: {product.title}</p>
                        <p>Category: {product.category}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
