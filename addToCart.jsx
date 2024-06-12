import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";

const ListProduct = () => {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/product");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container" style={{ marginTop: "2em" }}>
      <div className="row" style={{ gap: "2em" }}>
        {products.map((product) => (
          <div key={product.id} className="card card-menu" style={{ width: "19rem" }}>
            <button
              onClick={() => addToCart(product)}
              className="btn btn-primary add-to-cart-btn"
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;