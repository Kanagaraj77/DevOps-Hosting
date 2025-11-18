import Form from "./Form";

// add and edit form page
const AddEditLayout = ({
  setOpen,
  open,
  initialValues,
  handlesubmit,
  inModal,
  FormComponent,
  values,
  validationSchema,
  loading,
  status
}) => {
  return (
    <>
      <div>
        {values ? (
          <Form
            open={open}
            setOpen={setOpen}
            initialValues={initialValues}
            handlesubmit={handlesubmit}
            inModal={inModal}
            validationSchema={validationSchema}
            FormComponent={FormComponent}
            values={values}
            loading={loading}
            status={status}
          />
        ) : (
          <Form
            open={open}
            setOpen={setOpen}
            initialValues={initialValues}
            handlesubmit={handlesubmit}
            inModal={inModal}
            validationSchema={validationSchema}
            FormComponent={FormComponent}
            values={values}
            loading={loading}
            status={status}
          />
        )}
      </div>
    </>
  );
};

export default AddEditLayout;
