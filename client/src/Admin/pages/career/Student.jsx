import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getData } from "../../services/apiRequest";
import { IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";
import CommonModal from "../../components/common/Modal";
import ViewModal from "./ViewModal";

//  admin user front datatable page
const Student = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [studentId, setStudentId] = useState();

  const handleCancel = (formik, setOpen) => {
    setOpen(false);
  };

  // table column data
  const columns = [
    {
      name: "applyId",
      header: "Id",
      defaultVisible: true,
      defaultWidth: 80,
      type: "number",
    },
    { name: "name", header: "Name", defaultFlex: 1 },
    {
      name: "department",
      header: "Program",
      defaultFlex: 1,
    },
    {
      name: "sslcMark",
      header: "SSLC Mark",
      defaultFlex: 1,
    },
    {
      name: "hscMark",
      header: "HSC Mark",
      defaultFlex: 1,
    },
    {
        name: "_id",
        header: "View Details",
        defaultFlex: 1,
        render: ({ value, row, index }) => {
          const id = value; 
          console.log(id)
          return (
            <div
              onClick={() => {
                setOpen(true);
                setStudentId(id);
              }}
              className="table-icon-edit"
            >
              <IoIosEye />
            </div>
          );
        },
      }
      
  ];

  useEffect(() => {
    const data = async () => {
      const res = await getData("applynowform");
      setData(res?.data);
    };
    data();
  }, []);

  return (
    <>
      <FormLayout
        heading={"Students"}
        data={data}
        columns={columns}
        // text={"Add Career"}
        size={2}
        // btnLink={"/admin/addcareer"}
        front={true}
        form={false}
        // edit={"editcareer"}
        routename={"students"}
        deleteicon={true}
        hideFrontBtn={true}
      />
      <CommonModal
        open={open}
        setOpen={setOpen}
        chlidren={<ViewModal studentId={studentId}/>}
        formik={null}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Student;

// 1.FormLayout
// 2.FrontLayout => (2 case  => front-true || front-false => true => FrontLayout for front page layout with datatable and modal forms  && false => add and edit form layout)
// 3.AddEditLayout => (2 case => values-true || values-false => true => edit form page || false => add form page)
// 4.Form => (2 case => inModal-true || inModal-false => true => modal form || false => without modal form)
