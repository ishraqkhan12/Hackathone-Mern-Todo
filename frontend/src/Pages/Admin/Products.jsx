import React from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../components/adminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/get-all-products`
      );
      if (data?.success) {
        setProducts(data.Products);
        console.log(data.Products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //   return (
  //     <Layout>
  //       <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
  //         {/* Sidebar Area */}
  //         <div className="md:w-1/5 w-full md:fixed">
  //           <AdminMenu />
  //         </div>

  //         {/* Main Content */}
  //         <div className="md:ml-64 w-full md:w-4/5 p-4 bg-pink-100 min-h-screen">
  //           <h1 className="text-2xl font-bold text-blue-800 mb-4">
  //             Product List
  //           </h1>
  //           {/* Add dashboard cards or content here */}
  //         </div>
  //       </div>
  //     </Layout>
  //   );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
        {/* Sidebar */}
        <div className="md:w-1/5 w-full md:fixed">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="md:ml-64 w-full md:w-4/5 p-4  min-h-screen">
          <h1 className="text-4xl text-center font-bold text-gray-800 mb-4">
            Product List
          </h1>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <Link key={product._id} to={`/admin/products/${product.slug}`}>
              <div
                
                className="cursor-pointer shadow-lg shadow-gray-300 rounded-lg p-4 bg-white transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={`${import.meta.env.VITE_API}/api/v1/product/photo/${
                    product._id
                  }`}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-md"
                />
                <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600">
                  {product.description.slice(0, 60)}...
                </p>
                <p className="font-bold mt-2 text-blue-800">${product.price}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
