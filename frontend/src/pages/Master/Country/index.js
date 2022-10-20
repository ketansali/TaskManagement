import React, { useState, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCountry,
  deleteCountry,
  getAllCountry,
  updateCountry,
} from "../../../actions/Country.action";
import DataTable from "../../../components/Datatable";
import Delete from "../../../components/Delete";
import Modal from "../../../components/Modal";
const Country = () => {
  const dispatch = useDispatch();
  const countryData = useRef();
  const { loading, data } = useSelector((state) => state.country);
  countryData.current = data;
  const [countryName, setCountryName] = useState("");
  const [rowDataId, setRowDataId] = useState("");
  const [clsRed, setClsRed] = useState("");
  const [show, setShow] = useState(false);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);

  const showModal = () => {
    setClsRed("")
    setCountryName("");
    setShow(true);
  };

  const hideModal = () => {
    setCountryName("");
    setRowDataId("");
    setShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (countryName === "") {
      setClsRed("is-invalid");
      setShow(true);
      return false;
    }
    
    if (rowDataId) {
      dispatch(updateCountry({ id: rowDataId, countryName })).then(() => {
        setCountryName("");
        setRowDataId("");
        dispatch(getAllCountry({ search: "", page: 1, limit: 5 }));
      });
    } else {
      dispatch(addCountry({ countryName })).then(() => {
        dispatch(getAllCountry({ search: "", page: 1, limit: 5 }));
      });
    }

    setShow(false);
  };
  const showDeleteModal = (rowId)=>{
    setRowDataId(rowId)
      setDeleteModalShow(true)
  }
  const handleDelete = () => {  
   const id = countryData.current.data[rowDataId]._id;
    dispatch(deleteCountry(id)).then(() => {
      dispatch(getAllCountry({ search: "", page: 1, limit: 5 }));
      setDeleteModalShow(false);
      setRowDataId("")
    });
  };
  const handleUpdateModal = (rowId) => {
    const data = countryData.current.data[rowId];
    setCountryName(data.countryName);
    setRowDataId(data._id);
    setShow(true);
  };
  const fetchAPIData = ({ search, page, limit }) => {
    dispatch(getAllCountry({ search, page, limit }));
  };

  const fetchData = useCallback(({ search, page, limit }) => {
    fetchAPIData({ search, page, limit });
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        width: 100,
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Name",
        accessor: "countryName",
      },
      {
        Header: "Action",
        className: "text-right",
        Cell: (props) => (
          
          <div className="dropdown dropdown-action text-right">
            <a
              href="!#"
              className="action-icon dropdown-toggle"
              data-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="material-icons">more_vert</i>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <a
                className="dropdown-item"
                href="!#"
                data-toggle="modal"
                data-target="#modal"
                onClick={() => handleUpdateModal(props.row.id)}
              >
                <i className="fa fa-pencil m-r-5"></i> Edit
              </a>
              <a
                className="dropdown-item"
                href="!#"
                data-toggle="modal"
                data-target="#deleteModal"
                onClick={()=>showDeleteModal(props.row.id)}
              >
                <i className="fa fa-trash-o m-r-5"></i> Delete
              </a>
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="page-wrapper">
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">Country</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Master</a>
                </li>
                <li className="breadcrumb-item active">Country</li>
              </ul>
            </div>
            <div className="col-auto float-right ml-auto">
              <a
                href="!#"
                className="btn add-btn"
                data-toggle="modal"
                data-target="#modal"
                onClick={showModal}
              >
                <i className="fa fa-plus" /> Add Country
              </a>
            </div>
          </div>
        </div>
        {/* /Page Header */}

        <DataTable
          columns={columns}
          data={data ? data?.data : []}
          fetchData={fetchData}
          loading={loading}
          pages={data?.pages}
        />
        <Modal
          id="modal"
          title={rowDataId ? "Update Country" : "Add Country"}
          show={show}
          hideModal={hideModal}
        >
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Country Name <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control ${clsRed}`}
                  type="text"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  onKeyUp={(e)=>setClsRed(e.target.value !=null?"":"is-invalid")}
                />
              </div>
              <div className="submit-section">
                <button className="btn btn-primary submit-btn" type="submit">
                  {rowDataId ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
        {
          rowDataId && <Delete id="deleteModal"  setDeleteModalShow={DeleteModalShow} hideModal={hideModal} handleDelete={handleDelete}/>
        }
        
      </div>
      
    </div>
  );
};

export default Country;
