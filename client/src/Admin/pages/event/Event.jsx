import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData } from "../../services/apiRequest";

//  admin user front datatable page
const Event = () => {
  const [data, setData] = useState([]);

  // table column data
  const columns = [
    {
      name: "eventId",
      header: "Id",
      defaultVisible: true,
      defaultWidth: 80,
      type: "number",
    },
    { name: "title", header: "Name", defaultFlex: 1 },
    {
      name: "category",
      header: "Category",
      defaultFlex: 1,
      render: ({ value }) =>
        value?.charAt(0).toUpperCase() + value?.slice(1).toLowerCase(),
    },
    {
      name: "status",
      header: "Status",
      defaultFlex: 1,
      render: ({ value }) => (value === true ? "Active" : "Inactive"),
    },
    { name: "action", header: "Action", defaultFlex: 1 },
  ];

  useEffect(() => {
    const data = async () => {
      const res = await getData("event");
      setData(res?.data);
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Events"}
        data={data}
        columns={columns}
        text={"Add Events"}
        size={2}
        btnLink={"/admin/addevents"}
        front={true}
        form={false}
        edit={"editevent"}
        routename={"event"}
      />
    </>
  );
};

export default Event;

// 1.FormLayout
// 2.FrontLayout => (2 case  => front-true || front-false => true => FrontLayout for front page layout with datatable and modal forms  && false => add and edit form layout)
// 3.AddEditLayout => (2 case => values-true || values-false => true => edit form page || false => add form page)
// 4.Form => (2 case => inModal-true || inModal-false => true => modal form || false => without modal form)
