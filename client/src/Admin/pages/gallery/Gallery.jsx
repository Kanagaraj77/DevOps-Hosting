import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData } from "../../services/apiRequest";
import dayjs from "dayjs";

//  admin user front datatable page
const Gallery = () => {
  const [data, setData] = useState([]);

  // table column data
  const columns = [
    {
      name: "galleryId",
      header: "Id",
      defaultVisible: true,
      defaultWidth: 80,
      type: "number",
    },
    {
      name: "name",
      header: "Name",
      defaultFlex: 1,
      render: ({ value }) => {
        return value?.name;
      },
    },
    {
      name: "createdat",
      header: "Date",
      defaultFlex: 1,
      render: ({ value }) => {
        return dayjs(value).format("D/M/YYYY");
      },
    },
    {
      name: "status",
      header: "Status",
      defaultFlex: 1,
      render: ({ value }) => {
        if (value === true) {
          return <div>Active</div>;
        } else {
          return <div>Inactive</div>;
        }
      },
    },
    { name: "action", header: "Action", defaultFlex: 1 },
    ,
  ];

  // form

  useEffect(() => {
    const data = async () => {
      const res = await getData("gallery");
      setData(res?.data);
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Gallery"}
        data={data}
        columns={columns}
        text={"Add Gallery"}
        size={1}
        btnLink={"/admin/addgallery"}
        front={true}
        form={false}
        edit={"editgallery"}
        routename={"gallery"}
      />
    </>
  );
};

export default Gallery;
