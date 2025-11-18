import CommonButton from "./Button";
import DataTable from "./DataTable";
import Form from "./Form";

// front page with datatable
const FrontLayout = ({
  text,
  setOpen,
  size,
  loading,
  btnLink,
  open,
  initialValues,
  handlesubmit,
  inModal,
  FormComponent,
  values,
  data,
  columns,
  setEditData,
  validationSchema,
  form,
  routename,
  deleteicon,
  edit,
  preview,
  handleCancel,
  admindel,
  modalHeading,
  status,
  view,
  hideFrontBtn,
}) => {
  return (
    <>
      <div className="sidebarcont__div1">
        {!hideFrontBtn && (
          <CommonButton
            text={text}
            setOpen={setOpen}
            size={size}
            btnLink={btnLink}
          />
        )}
        {form && (
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
            handleCancel={handleCancel}
            modalHeading={modalHeading}
            status={status}
          />
        )}
      </div>
      {/* datatable */}
      <div className="sidebarTable">
        <DataTable
          data={data}
          columns={columns}
          edit={edit}
          open={open}
          setOpen={setOpen}
          routename={routename}
          // loading={loading}
          setEditData={setEditData}
          preview={preview}
          deleteicon={deleteicon}
          admindel={admindel}
          view={view}
        />
      </div>
    </>
  );
};

export default FrontLayout;
