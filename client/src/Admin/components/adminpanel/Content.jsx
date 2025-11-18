import React from "react";
import { Layout } from "antd";

const Content = ({ component }) => {
  const { Content } = Layout;

  return (
    <>
      <div style={{ position: "relative" }}>
        {/* content */}
        <Layout className={true ? "layout1 lay-cont" : "lay-cont"}>
          <Content style={{ overflow: "initial" }}>{component}</Content>
        </Layout>
      </div>
    </>
  );
};

export default Content;
