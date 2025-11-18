import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData } from "../../services/apiRequest";

//  admin user front datatable page
const Faculties = () => {
  const [data, setData] = useState([]);

  // table column data
  const columns = [
    {
      name: "employeeId",
      header: "Id",
      defaultVisible: true,
      defaultWidth: 80,
      type: "number",
    },
    { name: "name", header: "Faculty Name", defaultFlex: 1 },

    { name: "department", header: "Department", defaultFlex: 1 , 
      render: ({ value }) => (value?.name),
    },



    { name: "designation", header: "Designation", defaultFlex: 1 },
    { name: "qualification", header: "Qualification", defaultFlex: 1 },
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
      const res = await getData("faculties");
      setData(res?.data);
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Faculties"}
        data={data}
        columns={columns}
        text={"Add Faculty"}
        size={2}
        btnLink={"/admin/addfaculty"}
        front={true}
        form={false}
        edit={"editfaculty"}
        routename={"faculties"}
      />
    </>
  );
};

export default Faculties;


// 1.FormLayout 
// 2.FrontLayout => (2 case  => front-true || front-false => true => FrontLayout for front page layout with datatable and modal forms  && false => add and edit form layout)
// 3.AddEditLayout => (2 case => values-true || values-false => true => edit form page || false => add form page)
// 4.Form => (2 case => inModal-true || inModal-false => true => modal form || false => without modal form)
