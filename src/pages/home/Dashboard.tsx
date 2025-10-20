import React from "react";
import Searchbar from "./Searchbar";
import Welcome from "./Header";

const Dashboard = ({ setPage }) => {
  return (
    <div>
      <Searchbar />
      <Welcome setPage={setPage} />
    </div>
  );
};
export default Dashboard;
