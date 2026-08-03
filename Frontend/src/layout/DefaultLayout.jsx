import React from "react";
import Asidebar from "../pages/backend/Asidebar";
import Navbar from "../pages/backend/Navbar";


const DefaultLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Asidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <div className="flex-1 overflow-auto  bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;