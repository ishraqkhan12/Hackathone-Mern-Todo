import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import axios from "axios";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import TaskBoard from "./Admin/TaskBoard";

const Products = () => {
 
  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
      <TaskBoard/>


      </div>
    </Layout>
  );
};

export default Products;
