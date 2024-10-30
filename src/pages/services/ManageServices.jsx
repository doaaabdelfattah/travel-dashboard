import React from "react";
import PageHeader from "../../components/shared/PageHeader";
import AllServices from "../../components/services/AllServices";

const ManageServices = () => {
  return (
    <div className="wrapper">
      <PageHeader header={"Manage Services"} />
      <AllServices />
    </div>
  );
};

export default ManageServices;
