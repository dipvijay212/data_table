import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [detail, setDetail] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = () => {
    axios
      .get(`http://localhost:3000/products`)
      .then((response) => setDetail(response.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        alert("Product successfully deleted.");
        setDetail((prev) => prev.filter((product) => product.id !== id));
      })
      .catch((err) => console.log(err));
  };

  const handleViewMore = (id) => {
    navigate(`/Description/${id}`);
  };

  // Sorting logic
  const handleSort = (option) => {
    setSortOption(option);
    const sorted = [...detail];
    if (option === "price_asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (option === "price_desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (option === "title_asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (option === "title_desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }
    setDetail(sorted);
  };

  // Filter by category
  const filteredProducts = detail.filter((product) =>
    selectedCategory
      ? product.category.toLowerCase() === selectedCategory.toLowerCase()
      : true
  );

  // Search logic
  const searchedProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(searchedProducts.length / productsPerPage);
  const current = searchedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <>
      {/* Search, Filter, and Sort */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <option value="">All Categories</option>
          {Array.from(new Set(detail.map((product) => product.category))).map(
            (category) => (
              <option key={category} value={category}>
                {category}
              </option>
            )
          )}
        </select>
        <select
          onChange={(e) => handleSort(e.target.value)}
          value={sortOption}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="title_asc">Title: A to Z</option>
          <option value="title_desc">Title: Z to A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div
        className="card-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        {current.map((el) => (
          <div
            key={el.id}
            className="card"
            style={{
              border: "1px solid #ddd",
              overflow: "hidden",
              transition: "transform 0.2s, box-shadow 0.2s",
              backgroundColor: "#fff",
            }}
          >
            <img
              className="card-image"
              src={el.image}
              alt={el.title}
              height={250}
              width={250}
            />
            <h2>{el.id}</h2>
            <div className="card-content">
              <h2 className="card-title">{el.title}</h2>
              <p className="card-description">{el.description}</p>
              <h3 className="card-category">{el.category}</h3>
              <h4 className="card-price">{el.price}</h4>
            </div>

            <div style={{ padding: "10px", textAlign: "center" }}>
              <button
                onClick={(e) => handleDelete(el.id, e)}
                style={{
                  marginRight: "10px",
                  color: "black",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
              <button
                onClick={() => handleViewMore(el.id)}
                style={{
                  textDecoration: "none",
                  color: "black",
                  padding: "8px 12px",
                  borderRadius: "4px",
                }}
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Next & Previous Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default Product;

