import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { prices } from "../components/Prices";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import TaskBoard from "./Admin/TaskBoard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // Fetch all categories
  // const getAllCategories = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${import.meta.env.VITE_API}/api/v1/category/get-all-category`
  //     );
  //     if (data) {
  //       setCategory(data.categories);
  //     }
  //   } catch (error) {
  //     console.log(error);
      
  //     // toast.error("Something went wrong");
  //   }
  // };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-all-products`
      );
      if (data?.success) {
        setProducts(data.Products);
      }
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Handle price filter
  const handlePriceFilter = (priceRange) => {
    setRadio(priceRange);
  };

  useEffect(() => {
    // getAllCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  // Apply filters
  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      toast.error("Error applying filters");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
      <TaskBoard/>


      </div>
    </Layout>
  );
};

export default Products;
