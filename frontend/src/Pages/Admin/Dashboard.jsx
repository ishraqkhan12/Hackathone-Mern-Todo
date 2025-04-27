import React from "react";
import Layout from "../../layout/Layout";
import AdminMenu from "../../components/adminMenu";

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex-row min-h-screen pt-16 md:pt-0">
        {/* Sidebar Area */}
        <div className="md:w-1/5 w-full md:fixed">
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="md:ml-64 w-full md:w-4/5 p-4 bg-pink-100 min-h-screen">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Welcome, Ishraq!
          </h1>
          {/* Add dashboard cards or content here */}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
