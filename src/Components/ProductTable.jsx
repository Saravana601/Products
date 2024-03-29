import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import { tx } from "@transifex/native";
import { T } from "@transifex/react";

function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>
            <T _str="ID" _key="id" />
          </th>
          <th>
            <T _str="Title" _key="title" />
          </th>
          <th>
            <T _str="Price" _key="price" />
          </th>
          <th>
            <T _str="Description" _key="description" />
          </th>
          <th>
            <T _str="Category" _key="category" />
          </th>
          <th>
            <T _str="Image" _key="image" />
          </th>
          <th>
            <T _str="Rating" _key="rating" />
          </th>
          <th>
            <T _str="Count" _key="count" />
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <T _str={product.title} _key={product.title} />
            </td>
            <td>
              <T _str={product.price.toString()} />
            </td>
            <td>
              <T _str={product.description} />
            </td>
            <td>
              <T _str={product.category} />
            </td>
            <td>
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: "100px" }}
              />
            </td>
            <td>
              <T _str={`${product.rating.rate}`} />
            </td>
            <td>
              <T _str={`${product.rating.count}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
