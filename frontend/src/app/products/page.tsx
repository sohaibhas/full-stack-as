"use client";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api";
import ProductCard from "@/components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getResult = async () => {
      setIsLoading(true); // Start loading
      try {
        // fetching product data from mock api
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    getResult();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl py-2">Products</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap">
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
