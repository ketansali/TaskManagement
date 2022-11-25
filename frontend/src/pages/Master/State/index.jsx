import React, { useState, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addState,
  deleteState,
  getAllState,
  updateState,
  getAllCountry,
} from "../../../actions";
import DataTable from "../../../components/Datatable";
import Delete from "../../../components/Delete";
import Modal from "../../../components/Modal";
import Select from "react-select";
const State = () => {
  const dispatch = useDispatch();
  const stateData = useRef();
  const { loading, data } = useSelector((state) => state.State);
  const CountryData = useSelector((state) => state.Country);

  stateData.current = data;
  const [stateName, setStateName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [rowDataId, setRowDataId] = useState("");
  const [clsRed, setClsRed] = useState("");
  const [show, setShow] = useState(false);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [ddlStyle, setDdlStyle] = useState("");

  const showModal = () => {
    setCountryId("");
    setClsRed("");
    setStateName("");
    setShow(true);
  };

  const hideModal = () => {
    setDdlStyle("")
    setStateName("");
    setRowDataId("");
    setCountryId("");
    setShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ stateName, countryId });
    if (stateName === "" || countryId === "") {
      setClsRed("is-invalid");
      setDdlStyle(customStyles);
      setShow(true);
      return false;
    }

    if (rowDataId) {
      dispatch(updateState({ id: rowDataId, stateName })).then(() => {
        setCountryId("");
        setRowDataId("");
        dispatch(getAllState({ search: "", page: 1, limit: 5 }));
      });
    } else {
      dispatch(addState({ stateName, countryId: countryId.value })).then(() => {
        dispatch(getAllState({ search: "", page: 1, limit: 5 }));
      });
    }
    setShow(false);
  };
  const showDeleteModal = (rowId) => {
    setRowDataId(rowId);
    setDeleteModalShow(true);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const id = stateData.current.data[rowDataId]._id;
    dispatch(deleteState(id)).then(() => {
      dispatch(getAllState({ search: "", page: 1, limit: 5 }));
      setDeleteModalShow(false);
      setRowDataId("");
    });
  };
  const handleUpdateModal = (rowId) => {
    const data = stateData.current.data[rowId];

    setStateName(data.stateName);
    setRowDataId(data._id);
    setCountryId({ label: data.Country.countryName, value: data.Country._id });
    setShow(true);
  };
  const fetchAPIData = ({ search, page, limit }) => {
    dispatch(getAllCountry({ search: "", page: "", limit: "" }));
    dispatch(getAllState({ search, page, limit }));
  };

  const fetchData = useCallback(({ search, page, limit }) => {
    fetchAPIData({ search, page, limit });
    // eslint-disable-next-line
  }, []);
  const handleOnChange = (selected) => {
    setDdlStyle("")
    setCountryId(selected);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        width: 100,
        accessor: (_row, i) => i + 1,
      },
      {
        Header: "Country",
        accessor: "Country.countryName",
      },
      {
        Header: "State",
        accessor: "stateName",
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
                onClick={() => showDeleteModal(props.row.id)}
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

  const customStyles = {
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused
        ? "#ddd"
        : false
        ? "#ddd"
        : "#dc3545",
      //overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused
          ? "#ddd"
          : countryId
          ? true
          : false
          ? "#ddd"
          : "#dc3545",
      },
    }),
  };

  return (
    <div className="page-wrapper">
      {/* Page Content */}
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title">State</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Master</a>
                </li>
                <li className="breadcrumb-item active">State</li>
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
                <i className="fa fa-plus" /> Add State
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
          dispatch={dispatch}
        />

        <Modal
          id="modal"
          title={rowDataId ? "Update State" : "Add State"}
          show={show}
          hideModal={hideModal}
        >
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>
                  Country <span className="text-danger">*</span>
                </label>
                <Select
                  options={CountryData?.data?.data.map((e) => {
                    return {
                      label: e.countryName,
                      value: e._id,
                    };
                  })}
                  onChange={handleOnChange}
                  value={countryId}
                  isSearchable={true}
                  styles={countryId?"":ddlStyle}
                  theme={(theme) => ({
                    ...theme,
                   // color: "green",
                    colors: {
                      ...theme.colors,
                      primary: "#ff9b44",
                      primary25: "#ccc9",
                      //primary50: "#ff9b44",
                    },
                  })}
                />
              </div>

              <div className="form-group">
                <label>
                  State <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control ${stateName?"":clsRed}`}
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  onKeyUp={(e) =>
                    setClsRed(e.target.value != null ? "" : "is-invalid")
                  }
                  placeholder="Enter State Name"
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
        {rowDataId && (
          <Delete
            id="deleteModal"
            setDeleteModalShow={DeleteModalShow}
            hideModal={hideModal}
            handleDelete={(e) => handleDelete(e)}
          />
        )}
      </div>
    </div>
  );
};

export default State;
