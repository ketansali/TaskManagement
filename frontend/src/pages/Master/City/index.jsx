import React, { useState, useCallback, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCity,
  getAllCountry,
  getStateBindCountryId,
  addCity,
  updateCity,
  deleteCity,
} from "../../../actions";
import DataTable from "../../../components/Datatable";
import Delete from "../../../components/Delete";
import Modal from "../../../components/Modal";
import Select from "react-select";
import Toast from "../../../components/Toaster";
const City = () => {
  const dispatch = useDispatch();
  const stateData = useRef();
  const { loading, data } = useSelector((state) => state.City);
  const CountryData = useSelector((state) => state.Country);

  stateData.current = data;
  const [cityName, setCityName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [rowDataId, setRowDataId] = useState("");
  const [state, setState] = useState("");
  const [clsRed, setClsRed] = useState("");
  const [show, setShow] = useState(false);
  const [DeleteModalShow, setDeleteModalShow] = useState(false);
  const [ddlStyle, setDdlStyle] = useState("");
  const showModal = () => {
    setCountryId("");
    setClsRed("");
    setStateId("");
    setCityName("");
    setShow(true);
  };

  const hideModal = () => {
    setDdlStyle("")
    setStateId("");
    setCityName("");
    setRowDataId("");
    setCountryId("");
    setShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityName === "" || countryId === "" || stateId === "") {
      Toast({msg:"All field required", type:"error"})
      setClsRed("is-invalid");
      setDdlStyle(customStyles);
      setShow(true);
      return false;
    }

    if (rowDataId) {
      dispatch(updateCity({ id: rowDataId, cityName })).then(() => {
        setCountryId("");
        setRowDataId("");
        dispatch(getAllCity({ search: "", page: 1, limit: 5 }));
      });
    } else {
      dispatch(addCity({ cityName, stateId: stateId.value })).then(() => {
        dispatch(getAllCity({ search: "", page: 1, limit: 5 }));
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
    const data = stateData.current.data[rowDataId];
    dispatch(deleteCity(data.City._id)).then(() => {
      dispatch(getAllCity({ search: "", page: 1, limit: 5 }));
      setDeleteModalShow(false);
      setRowDataId("");
    });
  };
  const handleUpdateModal = (rowId) => {
    const data = stateData.current.data[rowId];
    handleOnChangeCountry({ value: data._id });
    setCityName(data.City.cityName);
    setStateId({ label: data.State.stateName, value: data.State._id });
    setRowDataId(data.City._id);
    setCountryId({ label: data.countryName, value: data._id });
    setShow(true);
  };
  const fetchAPIData = ({ search, page, limit }) => {
    dispatch(getAllCountry({ search: "", page: "", limit: "" }));
    dispatch(getAllCity({ search, page, limit }));
  };

  const fetchData = useCallback(({ search, page, limit }) => {
    fetchAPIData({ search, page, limit });
    // eslint-disable-next-line
  }, []);
  const handleOnChangeCountry = (selected) => {
    setStateId("");
    setDdlStyle("");
    dispatch(getStateBindCountryId({ id: selected.value })).then((state) => {
      setState(state.payload.data);
    });
    setCountryId(selected);
  };
  const handleOnChangeState = (selected) => {
    
    stateId === "" ? setDdlStyle(customStyles) : setDdlStyle("");
    setStateId(selected);
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
        accessor: "countryName",
      },
      {
        Header: "State",
        accessor: "State.stateName",
      },
      {
        Header: "City",
        accessor: "City.cityName",
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
        : countryId
        ? true
        : false
        ? "#ddd"
        : "#dc3545",
      // overwrittes hover style
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
              <h3 className="page-title">City</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Master</a>
                </li>
                <li className="breadcrumb-item active">City</li>
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
                <i className="fa fa-plus" /> Add City
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
          title={rowDataId ? "Update City" : "Add City"}
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
                  onChange={(e) => handleOnChangeCountry(e)}
                  value={countryId}
                  isSearchable={true}
                  theme={(theme) => ({
                    ...theme,
                    color: "green",
                    colors: {
                      ...theme.colors,
                      primary: "#ff9b44",
                      primary25: "#ff9b44",
                      primary50: "#ff9b44",
                    },
                  })}
                  styles={countryId?"":ddlStyle}
                />
              </div>
              <div className="form-group">
                <label>
                  State <span className="text-danger">*</span>
                </label>
                <Select
                  options={
                    state
                      ? state?.map((e) => {
                          return {
                            label: e.stateName,
                            value: e._id,
                          };
                        })
                      : [{ label: "Select state", value: "0" }]
                  }
                  onChange={handleOnChangeState}
                  value={stateId}
                  isSearchable={true}
                  styles={stateId?"":ddlStyle}
                  theme={(theme) => ({
                    ...theme,
                    color: "green",
                    colors: {
                      ...theme.colors,
                      primary: "#ff9b44",
                      primary25: "#ff9b44",
                      primary50: "#ff9b44",
                    },
                  })}
                />
              </div>

              <div className="form-group">
                <label>
                  State <span className="text-danger">*</span>
                </label>
                <input
                  className={`form-control ${clsRed}`}
                  type="text"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  onKeyUp={(e) =>
                    setClsRed(e.target.value != null ? "" : "is-invalid")
                  }
                  placeholder="Enter City Name"
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

export default City;
