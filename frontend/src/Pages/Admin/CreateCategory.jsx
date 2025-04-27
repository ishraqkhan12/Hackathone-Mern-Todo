import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../components/adminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/CategoryForm";
import { Button, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const [visibleAdd, setVisibleAdd] = useState(null);
  // handle add category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/category/create-category`,
        { name }
      );
      if (data.success == false) {
        toast.error(`${data.message}`);
      } else {
        console.log(data);
        toast.success(`"${name}" category added successfully `);
        setName("");
        getCategories();
        setVisibleAdd(false)
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in create category");
    }
  };

  //get all  categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/category/get-all-category`
      );
      console.log(data.categories);
      // console.log(data);

      if (data) {
        setCategory(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //update category
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API}/api/v1/category/update-category/${
          selected._id
        }`,
        { name: updatedName }
      );
      if (data.success == true) {
        toast.success(`"${updatedName}" category is updated`);
        setUpdatedName("");
        setVisible(false);
        setSelected(null);
        getCategories();
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
    }
  };

  //delete category
  const deleteCategory = async (id, name) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API}/api/v1/category/delete-category/${id}`
      );
      if (data.success == true) {
        toast.success(`"${name}" category is deleted successfully`);
        getCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
        {/* Sidebar Area */}
        <div className="md:w-1/5 w-full md:fixed">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="md:ml-64 w-full md:w-4/5 p-4 bg--100 min-h-screen">
          <div className="overflow-x-auto p-4">
            <h1 className="text-4xl font-bold text-blue-800 mb-4 text-center">
              Create category
            </h1>
            {/* 
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            /> */}
            <div className="flex justify-end">
              <button  onClick={() => {
                            setVisibleAdd(true)
                              
                          }} className=" mb-4 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-1 rounded">
                <FontAwesomeIcon icon={faPlus} />
                Add
              </button>
            </div>

            <table className="min-w-full borderborder-gray-300 rounded-lg shaadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-gray-700 font-semibold border-b">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-gray-700 font-semibold border-b">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {category.map((c, index) => {
                  return (
                    <tr key={c._id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 border-b">
                        {index + 1}. {c.name}
                      </td>
                      <td className="px-6 py-4 border-b ">
                        <button
                          onClick={() => {
                            setVisible(true),
                              setUpdatedName(c.name),
                              setSelected(c);
                          }}
                          className="border border-blue-700 text-blue-700  hover:bg-blue-600 hover:cursor-pointer hover:text-white px-4 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deleteCategory(c._id, c.name);
                          }}
                          className="bg-red-100 text-red-600 hover:bg-red-200 px-4 py-1 rounded ml-2 transition-all duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/*   edit */}
          <Modal
            onCancel={() => {
              setVisible(false);
            }}
            footer={null}
            open={visible}
          >
            <CategoryForm
              handleSubmit={updateCategory}
              value={updatedName}
              setValue={setUpdatedName}
              btn={'edit'}
            />
          </Modal>

          {/* add */}
          <Modal
            onCancel={() => {
              setVisibleAdd(false);
            }}
            footer={null}
            open={visibleAdd}
          >
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              btn={'add'}
            />
          </Modal>
          {/* Add dashboard cards or content here */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
