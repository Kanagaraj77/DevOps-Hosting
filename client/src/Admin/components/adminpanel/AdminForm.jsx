import { ErrorMessage, Formik } from "formik";
import { ToastError, ToastSuccess } from "../common/ToastMsg";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "../../styles/Adminform.css";


import * as yup from "yup";
import { CommonData } from "../../../Context";
import config from "../../../config";


const AdminForm = () => {
  const navigate = useNavigate();
  const {setAdminCurrentUser,setToken } = CommonData();
  
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);

  const adminform = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${config.apiUrl}/adminuser/login`,
        values
      );
      if (response.status === 200) {
        resetForm();
        localStorage.setItem("adminToken", response.data.token);
        const token = localStorage.getItem("adminToken");
   

        if (token) {
          try {
            const response = await axios.get(`${config.apiUrl}/adminuser/getcurrentuser`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            setAdminCurrentUser(response?.data?.userData);
           
          } catch (error) {
            if (error.response && error.response.status === 401) {
              localStorage.removeItem("token");
            }
            setAdminCurrentUser(null);
          }
        } else {
          setAdminCurrentUser(null);
        }
        setToken(token)
        navigate("/admin/dashboard");
        ToastSuccess("Login Successfully");
      }
    } catch (error) {
      console.log(error)
      ToastError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      navigate("/admin/dashboard");
      setToken(localStorage.getItem("adminToken"))
    } else {
      setLogin(true);
      setToken(null)
    }
  }, []);

  if (!login) {
    return null;
  }


  

  return (
    <>
      <div className="">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={adminform}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <section className="admin__login__section">
                <div className="admin__login__box">
                  <div className="admin__login__square"></div>
                  <div className="admin__login__square"></div>
                  <div className="admin__login__square"></div>
                  <div className="admin__login__square"></div>
                  <div className="admin__login__square"></div>
                  <div className="admin__login__square"></div>

                  <div className="admin__login__container">
                    <div className="admin__login__form">
                      <h2 className="text-center">Admin Login</h2>
                      {/* <form action=""> */}
                      <div className="mb-3 admin__login__inputBx">
                        <label
                          className="admin__login__label"
                          htmlFor="username"
                        >
                          User Name
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            formik.touched.username && formik.errors.username
                              ? "userformhead__error is-invalid"
                              : null
                          }`}
                          id="username"
                          name="username"
                          {...formik.getFieldProps("username")}
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="userformhead__formErr"
                        />
                      </div>
                      <div className="mb-3 admin__login__inputBx1">
                        <label
                          className="admin__login__label"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <Input.Password
                          className={`form-control Form-password ${
                            formik.touched.password && formik.errors.password
                              ? "userformhead__error is-invalid is-invalid"
                              : null
                          }`}
                          {...formik.getFieldProps("password")}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="userformhead__formErr"
                        />
                      </div>
                      <Button
                        className="admin__login__btn"
                        htmlType="submit"
                        loading={loading}
                      >
                        Submit
                      </Button>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </section>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AdminForm;
