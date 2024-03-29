import React, { useState, useEffect } from "react";
import "./ProductTable.css";
import { tx } from "@transifex/native";
import { T } from "@transifex/react";

const corsProxy = "https://cors-anywhere.herokuapp.com/";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const clonedResponse = response.clone();

        const data = await response.json();
        setProducts(data);
        console.log(data);

        const resourceTranslations = {};
        const resourceKeys = [
          "title",
          "description",
          "category",
          "price",
          "rating",
        ];

        data.forEach((product) => {
          resourceKeys.forEach((key) => {
            if (product[key]) {
              const value =
                typeof product[key] === "object"
                  ? JSON.stringify(product[key])
                  : product[key];
              resourceTranslations[value] = value;
            }
          });
        });

        const requestBody = {
          data: {
            relationships: {
              base: { data: { type: "resources" } },
              i18n_format: { data: { type: "i18n_formats" } },
              project: { data: { type: "projects" } },
            },
            type: "resources",
          },
        };

        const apiUrl = `${corsProxy}https://www.transifex.com/api/3/project/demoproject-6/resource/demoproject-6/translation/${tx.getCurrentLocale()}/?mode=onlysuggestedandtranslated`;
        const apiResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer 1/ff1d2ae56382aff7b28dc506a3ed64276ed89343`,
          },
          body: JSON.stringify(requestBody),
        });

        // const options = {
        //   method: "POST",
        //   headers: {
        //     accept: "application/vnd.api+json",
        //     "content-type": "application/vnd.api+json",
        //     authorization: "Bearer 1/ff1d2ae56382aff7b28dc506a3ed64276ed89343",
        //   },
        //   body: '{"data":{"attributes":{"callback_url":null,"content_encoding":"text","file_type":"default"},"relationships":{"language":{"data":{"type":"languages"}},"resource":{"data":{"type":"resources"}}},"type":"resource_translations_async_uploads"}}',
        // };

        // fetch(
        //   "https://rest.api.transifex.com/resource_translations_async_uploads",
        //   options
        // )
        //   .then((response) => response.json())
        //   .then((response) => console.log(response))
        //   .catch((err) => console.error(err));

        if (apiResponse.ok) {
          const data = await clonedResponse.json();
          setTranslations(data.content);
        } else {
          console.error("Error uploading translations:", apiResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getTranslation = (key, defaultValue) => {
    if (translations && Object.keys(translations).length > 0) {
      return translations[key] || defaultValue;
    } else {
      return defaultValue;
    }
  };

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
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>
              <T _str={product.title} _key={product.title} />
            </td>
            <td>{getTranslation(product.price.toString(), product.price)}</td>
            <td>{getTranslation(product.description, product.description)}</td>
            <td>
              <T _str={product.category} _key={product.category} />
            </td>
            <td>
              <img
                src={product.image}
                alt={product.title}
                style={{ maxWidth: "100px" }}
              />
            </td>
            <td>
              {getTranslation(
                `${product.rating.rate} (${product.rating.count})`,
                `${product.rating.rate} (${product.rating.count})`
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
