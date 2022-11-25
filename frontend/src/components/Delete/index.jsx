import React from "react";
const Delete = ({ id, setDeleteModalShow, handleDelete }) => {
  return (
    <div
      id={id}
      className={
        setDeleteModalShow
          ? "modal custom-modal fade show"
          : "modal custom-modal fade"
      }
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="form-header">
              {/* <h3>Delete </h3> */}
              <i class="fa fa-info-circle"  style={{fontSize:"40px",color:'red'}}></i>
              <p>Are you sure want to delete?</p>
            </div>
            <div className="modal-btn delete-action">
              <div className="row">
                <div className="col-6">
                  <a
                    href="!#"
                    className="btn btn-primary continue-btn"
                    onClick={(e)=>handleDelete(e)}
                  >
                    Delete
                  </a>
                </div>
                <div className="col-6">
                  <a
                    href="!#"
                    data-dismiss="modal"
                    className="btn btn-primary cancel-btn"
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
