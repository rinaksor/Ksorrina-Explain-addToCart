import React, { useState, useEffect, useContext } from "react"; // Import các module từ thư viện "react"

import { CartContext } from "../CartContext"; // Import CartContext để sử dụng lại và chia sẻ thông tin giỏ hàng

// Component ListProduct để hiển thị danh sách sản phẩm và cho phép người dùng thêm sản phẩm vào giỏ hàng
const ListProduct = () => {
  // Sử dụng hook useContext để lấy giá trị của addToCart từ CartContext
  const { addToCart } = useContext(CartContext);
  
  // Sử dụng hook useState để khởi tạo các state products, loading, error.
  const [products, setProducts] = useState([]); // State lưu trữ danh sách sản phẩm
  const [loading, setLoading] = useState(true); // State kiểm soát trạng thái loading
  const [error, setError] = useState(null); // State lưu trữ lỗi (nếu có)

  // Sử dụng hook useEffect để thực hiện side effect khi component được render
  useEffect(() => {
    // Hàm fetchProducts được gọi khi component được render
    const fetchProducts = async () => {
      try {
        // Gửi yêu cầu HTTP GET đến API để lấy danh sách sản phẩm
        const response = await fetch("http://127.0.0.1:8000/api/admin/product");
        
        // Kiểm tra xem response có thành công không
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        
        // Parse dữ liệu response thành JSON
        const data = await response.json();
        
        // Cập nhật state products với dữ liệu từ API và đánh dấu loading đã hoàn thành
        setProducts(data);
        setLoading(false);
      } catch (error) {
        // Xử lý lỗi nếu có và đánh dấu loading đã hoàn thành
        setError(error);
        setLoading(false);
      }
    };

    // Gọi hàm fetchProducts khi component được render
    fetchProducts();
  }, []);

  // Kiểm tra trạng thái loading và trạng thái error để hiển thị thông báo tương ứng
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Nếu không có lỗi và loading đã hoàn thành, render danh sách sản phẩm
  return (
    <div className="container" style={{ marginTop: "2em" }}>
      <div className="row" style={{ gap: "2em" }}>
        {products.map((product) => (
          <div key={product.id} className="card card-menu" style={{ width: "19rem" }}>
            {/* Render thông tin của mỗi sản phẩm */}
            <button
              onClick={() => addToCart(product)} // Gọi hàm addToCart khi người dùng nhấn vào nút "Add to Cart"
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
