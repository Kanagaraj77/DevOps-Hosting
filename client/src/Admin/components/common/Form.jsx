import { Formik } from "formik";
import CommonModal from "./Modal";

// form component page
const Form = ({
  initialValues,
  validationSchema,
  handlesubmit,
  inModal,
  open,
  setOpen,
  FormComponent,
  values,
  loading,
  handleCancel,
  status,
  modalHeading
}) => {

  return (
    <>
      {values ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema || null}
          onSubmit={handlesubmit}
        >
          {(formik) => (
            <>
              {inModal && (
                <>
                  <CommonModal
                    open={open}
                    setOpen={setOpen}
                    chlidren={
                      <FormComponent
                        formik={formik}
                        status={status}
                        loading={loading}
                        open={open}
                        modalHeading={modalHeading}
                      />
                    }
                    formik={formik}
                    handleCancel={handleCancel}
                  />
                </>
              )}

              {!inModal && (
                <>
                  <FormComponent
                    formik={formik}
                    status={status}
                    loading={loading}
                    values={values}
                  />
                </>
              )}
            </>
          )}
        </Formik>
      ) : null}

      {values == null && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema || null}
          onSubmit={handlesubmit}
        >
          {(formik) => (
            <>
              {inModal && (
                <>
                  <CommonModal
                    open={open}
                    setOpen={setOpen}
                    chlidren={
                      <FormComponent formik={formik} loading={loading}  open={open} status={status}  modalHeading={modalHeading}/>
                    }
                    formik={formik}
                    handleCancel={handleCancel}
                  />
                </>
              )}

              {!inModal && (
                <>
                  <FormComponent
                    formik={formik}
                    loading={loading}
                    values={values}
                    status={status}
                  />
                </>
              )}
            </>
          )}
        </Formik>
      )}
    </>
  );
};

export default Form;
