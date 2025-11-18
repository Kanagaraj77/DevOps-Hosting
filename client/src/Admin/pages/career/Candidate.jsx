import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData } from "../../services/apiRequest";

//  admin user front datatable page
const Candidate = () => {
  const [data, setData] = useState([]);

  // table column data
  const columns = [
    {
      name: "careerId",
      header: "Id",
      defaultVisible: true,
      defaultWidth: 80,
      type: "number",
    },
    { name: "name", header: "Name", defaultFlex: 1 },
    {
      name: "applyfor",
      header: "Apply for",
      defaultFlex: 1,
    },
    {
      name: "experience",
      header: "Experience",
      defaultFlex: 1,
    },
    {
      name: "phone",
      header: "Phone",
      defaultFlex: 1,
    },
    { name: "action", header: "Action", defaultFlex: 1 },
  ];

  useEffect(() => {
    const data = async () => {
      const res = await getData("careerform");
      setData(res?.data);
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Candidates"}
        data={data}
        columns={columns}
        // text={"Add Career"}
        size={2}
        // btnLink={"/admin/addcareer"}
        front={true}
        form={false}
        // edit={"editcareer"}
        routename={"candidates"}
        deleteicon={true}
        view={true}
        pdfFor={"careerresume"}
        hideFrontBtn={true}
      />
    </>
  );
};

export default Candidate;

// 1.FormLayout
// 2.FrontLayout => (2 case  => front-true || front-false => true => FrontLayout for front page layout with datatable and modal forms  && false => add and edit form layout)
// 3.AddEditLayout => (2 case => values-true || values-false => true => edit form page || false => add form page)
// 4.Form => (2 case => inModal-true || inModal-false => true => modal form || false => without modal form)
