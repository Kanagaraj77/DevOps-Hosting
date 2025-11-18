import React, { useEffect, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { IoIosEye } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { CommonData } from "../../../Context";
import config from "../../../config";
import { deleteData } from "../../services/apiRequest";

const MySwal = withReactContent(Swal);

const DataTable = ({
  data,
  columns,
  edit,
  routename,
  loading,
  setEditData,
  setOpen,
  view, // for all row in table
  particularview, //for particular row in table
  pdfFor,
  deleteicon,
  po,
  statusAction,
  setData,
  inv,
  orderInv,
  admindel,
  preview,
}) => {
  const [tabledata, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(false);
  const { adminCurrentUser } = CommonData();
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const filteredData = tabledata.filter((row) => {
    return columns.some((column) => {
      const value = row[column.name];
      return (
        value && value.toString().toLowerCase().includes(search.toLowerCase())
      );
    });
  });
  const handleDelete = async (id) => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await deleteData(routename, id);

            
            if (res?.response?.status == 400 || res?.response?.status == 500) {
              throw new Error(res?.response?.data?.message);
            } else {
              setTableData((prevData) =>
                prevData.filter((row) => row._id !== id)
              );
              await MySwal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          } catch (err) {
            console.log(err);
            await MySwal.fire({
              title: "Error!",
              text: `${err?.response?.data?.message || err}`,
              icon: "error",
            });
          }
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          MySwal.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleStatus = async (id, status, name) => {
    try {
      MySwal.fire({
        title: "Are you sure?",
        text: `Is the user ${name} set to ${status ? "active" : "inactive"}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            setStatus(true);
            const res = await axios.put(`${config.apiUrl}user/${id}`, {
              status: status,
            });
            if (res?.status == 200) {
              const res1 = await axios.get(`${config.apiUrl}/user`);
              setTableData(res1?.data);
              setData(res1?.data);
            }
            setStatus(false);
          } catch (error) {
            setStatus(false);
          }
        } else if (result.dismiss === MySwal.DismissReason.cancel) {
          MySwal.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const gridStyle = {
    minHeight: 490,
  };

  const modalfn = (row) => {
    setOpen((prev) => !prev);
    setEditData(row._id);
  };
  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.createdat);
      const dateB = new Date(b.createdat);
      return dateB - dateA;
    });

    const updatedData = sortedData?.map((row, index) => ({
      ...row,
      // id: index + 1,
      action: (
        <div>
          {edit === "modal" ? (
            <>
              <MdEditSquare
                className="table-icon-edit"
                onClick={() => modalfn(row)}
              />
            </>
          ) : (
            edit && (
              <>
                <Link
                  key={`edit_${index}`}
                  to={`/admin/${edit}/${row._id}`}
                  className="table-icon-edit"
                >
                  <MdEditSquare />
                </Link>
              </>
            )
          )}
          {preview && (
            <>
              <Link
                key={`edit_${index}`}
                to={`/${preview}/${row._id}`}
                className="table-icon-edit"
              >
                <IoIosEye />
              </Link>
            </>
          )}
          {!deleteicon && (
            <Link
              key={`delete_${index}`}
              onClick={() => handleDelete(row._id)}
              className="table-icon-del"
            >
              <MdDeleteForever />
            </Link>
          )}
          {admindel && row?._id !== adminCurrentUser?._id && (
            <Link
              key={`delete_${index}`}
              onClick={() => handleDelete(row._id)}
              className="table-icon-del"
            >
              <MdDeleteForever />
            </Link>
          )}
          {view && (
            <Link
              to={`${config.pdf}/${"uploads/careerresume"}/${row.resume}`}
              className="table-icon-view"
              target="_blank"
            >
              <IoIosEye />
            </Link>
          )}
          {orderInv && (
            <Link
              to={`${config.pdf}/${pdfFor}/${row?.invoiceid?.file}.pdf`}
              className="table-icon-view"
              target="_blank"
            >
              <IoIosEye />
            </Link>
          )}
          {particularview && (
            <>
              {row?.status && (
                <Link
                  to={`${config.pdf}/${pdfFor}/${row?.invoiceid?.file}.pdf`}
                  className="table-icon-view"
                  target="_blank"
                >
                  <IoIosEye />
                </Link>
              )}
            </>
          )}
          {statusAction && (
            <>
              {row?.status ? (
                <div
                  className="user_action_status_1"
                  onClick={() => handleStatus(row?._id, false, row?.name)}
                >
                  <ImCross />
                </div>
              ) : (
                <div
                  className="user_action_status_2"
                  onClick={() => handleStatus(row?._id, true, row?.name)}
                >
                  <TiTick />
                </div>
              )}
            </>
          )}
        </div>
      ),
    }));
    setTableData(updatedData);
  }, [data]);

  return (
    <>
      <>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          style={{
            marginBottom: "30px",
            border: "0",
            height: "40px",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
            borderRadius: "5px",
            padding: "5px 10px",
          }}
          className="datetable-search"
        />
        <ReactDataGrid
          idProperty="id"
          style={gridStyle}
          columns={columns}
          pagination
          loading={loading}
          defaultLimit={10}
          dataSource={filteredData}
          // defaultFilterValue={filterValue}
        />
      </>
    </>
  );
};

export default DataTable;
