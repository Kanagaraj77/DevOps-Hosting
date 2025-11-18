import React from "react";
import InfrastructureCards from "./Components/Infrastructure/InfrastructureCards";
import Topbanner from "./Components/Common/Topbanner";

const Infrastructure = () => {
  return (
    <div>
      <Topbanner currentPage="Infrastructure" />
      <InfrastructureCards />
    </div>
  );
};

export default Infrastructure;
