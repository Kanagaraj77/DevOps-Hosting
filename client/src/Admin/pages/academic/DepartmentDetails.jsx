import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData } from "../../services/apiRequest";

//  admin user front datatable page
const Event = () => {
  const [data, setData] = useState([]);

  // table column data
  const columns = [
    {
      name: "departmentDetailsId",
      header: "Id",
      defaultWidth: 80,
    },
    { name: "department", header: "Department", render: ({ value }) => value?.name, defaultFlex: 1 },
    { name: "department", header: "Department Category", render: ({ value }) => value?.category, defaultFlex: 1 },
    { name: "action", header: "Action", defaultFlex: 1 },
  ];

  useEffect(() => {
    const data = async () => {
      const res = await getData("department-details");
      setData(res?.data);
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Department Details"}
        data={data}
        columns={columns}
        text={"Add Events"}
        size={2}
        btnLink={"/admin/add-department-details"}
        front={true}
        form={false}
        edit={"edit-department-details"}
        routename={"department-details"}
        deleteicon={true}
        admindel={true}
      />
    </>
  );
};

export default Event;

// 1.FormLayout
// 2.FrontLayout => (2 case  => front-true || front-false => true => FrontLayout for front page layout with datatable and modal forms  && false => add and edit form layout)
// 3.AddEditLayout => (2 case => values-true || values-false => true => edit form page || false => add form page)
// 4.Form => (2 case => inModal-true || inModal-false => true => modal form || false => without modal form)
