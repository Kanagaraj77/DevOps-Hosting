import CommonInput from "../common/Input";
import CommonButton from "../common/Button";
import { FieldArray } from "formik";
import CommonUpload from "../common/Upload";
import { FaSquarePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useState } from "react";

const BannerForm = ({ formik, status, loading, values }) => {
  const [del, setDel] = useState(true);
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="mt-5">
        <FieldArray name="banner">
          {({ remove, push }) => (
            <div className="row">
              {formik?.values?.banner?.map((item, index) => (
                <>
                  <div className="col-12 col-md-4">
                    <div>
                      <CommonUpload
                        formik={formik}
                        name={`banner.${[index]}.img`}
                        limit={1}
                        existingImages={
                          formik?.values?.banner?.[index]?.img
                            ? formik?.values?.banner?.[index]?.img
                            : ""
                        }
                        pdfimagepathname={"banner"}
                        settingname={"Banner"}
                        key={index}
                        index={index}
                        del={del}
                        setDel={setDel}
                        forBannerUpload={true}
                        banner={
                          formik?.values?.banner?.[index]?.mobile
                            ? null
                            : "banner"
                        }
                      />
                    </div>
                    <div className="mt-3 mb-2">
                      <CommonInput
                        inputType="checkbox"
                        formikName={`banner.${[index]}.mobile`}
                        formik={formik}
                        disabled={
                          formik?.values?.banner?.[index]?.img?.length > 0
                        }
                      />
                    </div>
                    <div>
                      <CommonInput
                        inputType="input"
                        formikName={`banner.${[index]}.url`}
                        formik={formik}
                        label={"URL"}
                      />
                    </div>

                    <div className="d-flex">
                      {/* {formik?.values?.images?.length + 1 <= 6 && ( */}
                      <>
                        {index === formik?.values?.banner?.length - 1 && (
                          <button
                            className="variant__add__btn variant__add__btn__banner me-3 mt-3"
                            onClick={() =>
                              push({
                                img: [],
                                url: "",
                                mobile: false,
                              })
                            }
                            type="button"
                          >
                            <span className="variant__add__btn__text">Add</span>
                            <span className="variant__add__btn__icon">
                              <FaSquarePlus className="variant__add__btn__svg" />
                            </span>
                          </button>
                        )}
                      </>
                      {/* )} */}

                      {index !== 0 && (
                        <button
                          className="variant__del__btn variant__del__btn__banner mt-3"
                          onClick={() => {
                            setDel(true);
                            remove(index);
                          }}
                          type="button"
                        >
                          <span className="variant__del__btn__text">
                            Delete
                          </span>
                          <span className="variant__del__btn__icon">
                            <MdDelete className="variant__del__btn__svg" />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </FieldArray>
        <div className="form_btn_div">
          <CommonButton
            antdBtn={true}
            text={"Submit"}
            mb={"mb-3"}
            mt={"mt-3"}
            loading={loading}
            htmlType={"submit"}
          />
        </div>
      </form>
    </>
  );
};

export default BannerForm;
