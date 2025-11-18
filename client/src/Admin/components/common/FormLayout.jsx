import AddEditLayout from "./AddEditLayout";
import FrontLayout from "./FrontLayout";

const FormLayout = ({
  heading,
  data,
  columns,
  setOpen,
  open,
  initialValues,
  handlesubmit,
  inModal,
  validationSchema,
  text,
  FormComponent,
  setEditData,
  values,
  size,
  loading,
  btnLink,
  front,
  form,
  routename,
  deleteicon,
  edit,
  preview,
  handleCancel,
  status,
  modalHeading,
  admindel,
  view,
  hideFrontBtn
}) => {
  return (
    <>
      <div className="form_layout">
        <div className="form_layout_inner">
          <div className="sidebarcont">
            <h2 className="sidebarcont__heading">{heading}</h2>

            {front && (
              <FrontLayout
                text={text}
                setOpen={setOpen}
                size={size}
                loading={loading}
                btnLink={btnLink}
                initialValues={initialValues}
                handlesubmit={handlesubmit}
                inModal={inModal}
                validationSchema={validationSchema}
                FormComponent={FormComponent}
                values={values}
                data={data}
                columns={columns}
                setEditData={setEditData}
                open={open}
                form={form}
                routename={routename}
                deleteicon={deleteicon}
                edit={edit}
                preview={preview}
                handleCancel={handleCancel}
                admindel={admindel}
                modalHeading={modalHeading}
                status={status}
                view={view}
                hideFrontBtn ={hideFrontBtn}
              />
            )}
            {!front && (
              <AddEditLayout
                text={text}
                setOpen={setOpen}
                size={size}
                loading={loading}
                btnLink={btnLink}
                initialValues={initialValues}
                handlesubmit={handlesubmit}
                inModal={inModal}
                validationSchema={validationSchema}
                FormComponent={FormComponent}
                values={values}
                data={data}
                columns={columns}
                setEditData={setEditData}
                open={open}
                status={status}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
