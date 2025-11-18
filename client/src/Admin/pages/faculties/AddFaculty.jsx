import { useEffect, useState } from "react";
import FormLayout from "../../components/common/FormLayout";
import { getOneData, postData, postOneData } from "../../services/apiRequest";
import { ToastSuccess} from "../../components/common/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import FacultyForm from "../../components/form/academic/FacultyAddForm";
import { facultySchema } from "../../../../../shared/validation/facultySchema";
import errorHandler from "../../services/errorHandler";

const AddFaculty = () => {
  const { id } = useParams();
  const [vals, setVals] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    employeeId: "",
    name: "",
    department: [],
    designation: "",
    qualification: "",
    image: [],
    status: "",
    description: "",
  };

  const handlesubmit = async (values, { resetForm }) => {
    try {
      if (vals) {
        setLoading(true);
        const img1 = values.image.map((val) =>
          val?.url ? val.url : val?.response?.file?.filename
        );
        const imgString = img1.join(", ");
        const response = await postOneData(
          "faculties",
          {
            ...values,
            image: imgString,
          },
          id
        );
        if (response?.status === 200) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/faculties");
          setLoading(false);
        } errorHandler(response, ToastError, setLoading);
      } else {
        setLoading(true);
        const img1 = values.image.map((val) =>
          val?.url ? val.url : val?.response?.file?.filename
        );
        const imgString = img1.join(", ");
        const response = await postData("faculties", {
          ...values,
          image: imgString,
        });
        if (response?.status === 201) {
          ToastSuccess(response?.data?.message || "Success");
          resetForm();
          navigate("/admin/faculties");
          setLoading(false);
        } errorHandler(response, ToastError, setLoading);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
          const res = await getOneData("faculties", id);
          if(res?.data) {
            setVals({
              employeeId: res.data.employeeId,
              name: res.data.name,
              department: res.data.department,
              designation: res.data.designation,
              qualification: res.data.qualification,
              description: res?.data?.description,
              image: res?.data?.image ? res?.data?.image.split(",").map((url) => ({ url })) : res?.data?.image,
              status: res.data.status,
            });
          }
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {vals === null && id ? (
        <div>Loading...</div>
      ) : (
        <FormLayout
          heading={vals ? "Edit Faculty" : "Add Faculty"}
          initialValues={vals ? vals : initialValues}
          handlesubmit={handlesubmit}
          FormComponent={FacultyForm}
          validationSchema={facultySchema}
          values={vals}
          loading={loading}
          size={2}
          front={false}
          inModal={false}
          status={vals ? true : false}
        />
      )}
    </>
  );
};

export default AddFaculty;
