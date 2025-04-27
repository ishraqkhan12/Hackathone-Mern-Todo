import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../components/adminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [Category, setCategory] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    shipping: "",
    category: "",
    photo: null,
    id: ""
  });

  // get single product by slug
  const singleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/product/single-product/${
          params.slug
        }`
      );
      console.log(data.singleProduct);

      setForm({
        ...form,
        name: `${data.singleProduct.name}`,
        description: `${data.singleProduct.description}`,
        price: `${data.singleProduct.price}`,
        quantity: `${data.singleProduct.quantity}`,
        shipping: data.singleProduct.shipping ? "1" : "0",
        category: `${data.singleProduct.category._id}`,
        id: `${data.singleProduct._id}`,

        // photo: `${data.singleProduct.photo}`,


      });
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-all-category`
      );
      //   console.log(data.categories);
      // console.log(data);

      if (data) {
        setCategory(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
    singleProduct();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("quantity", form.quantity);
      formData.append("shipping", form.shipping);
      formData.append("category", form.category);
      
      if (form.photo) {
        formData.append("photo", form.photo);
      }
  
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/product/update-product/${form.id}`,
        formData
      );
      if (data?.success) {
        toast.success("Product Updated Successfully!");
      singleProduct(); 

        navigate("/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Product update failed");
    }
  };
  

  // delete product
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return; // User ne cancel kar diya
  
      const { data } = await axios.delete(`${import.meta.env.VITE_API}/api/v1/product/delete-product/${form.id}`);
      if (data?.success) {
        toast.success(data.message);
        navigate('/admin/products')

        ; // Refresh the products list
      } else {
        toast.error("Failed to delete the product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while deleting");
    }
  };
  

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
        {/* Sidebar Area */}
        <div className="md:w-1/5 w-full md:fixed">
          <AdminMenu />
        </div>
        <div className="md:ml-64 w-full md:w-4/5 p-4 bg-pink-1000 min-h-screen">
          <h2 className="text-4xl font-bold mb-6 text-center text-blue-800 text-gray--800">
            Update Product
          </h2>
          <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-xl shadow-md">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-5"
            >
              {/* category */}

              <Select
                value={Category.map((cat) => ({
                  value: cat._id,
                  label: cat.name,
                })).find((option) => option.value === form.category)}
                onChange={(selectedOption) =>
                  setForm({ ...form, category: selectedOption.value })
                }
                options={Category.map((cat) => ({
                  value: cat._id,
                  label: cat.name,
                }))}
                placeholder="Select Category"
                className="basic-single w-full"
                classNamePrefix="select"
                required
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: "6px",
                    borderRadius: "8px",
                    borderColor: "#D1D5DB",
                    boxShadow: "0 0 0 0px #9CA3AF",
                    borderWidth: "0.5px",
                    "&:hover": { borderColor: "#9CA3AF" },
                  }),
                }}
              />

              {/* image */}
              <label
                className="btn  w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-600 text-center cursor-cell text-white bg-gray-500 hover:text-white
                 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:shadow-md focus:shadow-gray-300 transition duration-200
                  flex items-center justify-center"
              >
                {form.photo ? form.photo.name : "upload photo"}
                <input
                  type="file"
                  accept="image/*"
                  // name="photo"
                  hidden
                  onChange={(e) =>
                    setForm({ ...form, photo: e.target.files[0] })
                  }
                  
                />
              </label>
              {form.photo ? (
                <div className="mt-4 flex justify-center">
                  <img
                    src={URL.createObjectURL(form.photo)}
                    alt="Preview"
                    className="w-39 h-32 object-cover rounded-md border border-gray-300"
                  />
                </div>
              ):(
                <div className="mt-4 flex justify-center">
                  <img
                     src={`${import.meta.env.VITE_API}/api/v1/product/photo/${
                        form.id
                      }`}
                    alt="Preview"
                    className="w-39 h-32 object-cover rounded-md border border-gray-300"
                  />
                </div>
              )}

              {/* product name */}
              <input
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-1 focus:ring-gray-400 
           focus:shadow-md focus:shadow-gray-300 transition duration-200"
              />

              {/* description */}
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none h-28 
           focus:outline-none focus:ring-1 focus:ring-gray-400 
           focus:shadow-md focus:shadow-gray-300 transition duration-200"
              />
              {/* Price */}
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:outline-none focus:ring-1 focus:ring-gray-400 
           focus:shadow-md focus:shadow-gray-300 transition duration-200"
              />
              {/* quantity */}
              <input
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg 
           focus:outline-none focus:ring-1 focus:ring-gray-400 
           focus:shadow-md focus:shadow-gray-300 transition duration-200 "
              />

              <select
                value={form.shipping}
                onChange={(e) => setForm({ ...form, shipping: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white
           focus:outline-none focus:ring-1 focus:ring-gray-400 
           focus:shadow-md focus:shadow-gray-300 transition duration-200"
              >
                <option value="">Shipping Available?</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-800 cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-900 transition"
              >
                Update Product
              </button>
              <button
                onClick={handleDelete}
                type="button"
                className="w-full py-2 px-4 bg-red-600 cursor-pointer text-white font-semibold rounded-lg hover:bg-red-900 transition"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
