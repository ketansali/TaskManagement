import React from 'react'


const Modal = ({ children, show, hideModal,title ,id }) => { 
  let modalbackdrop = document.getElementById('modal-backdrop')
  if(modalbackdrop !== null && show=== false){
    modalbackdrop.remove()
  }
  return (
    <div id={show ?id:id}  className={show ? "modal custom-modal fade show":" modal custom-modal fade"} role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
         {children}
        </div>
      </div>
    </div>
  )
}

export default Modal

//<div id="add_department" class="modal custom-modal fade show" role="dialog" aria-modal="true" style="padding-right: 17px; display: block;"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Add Department</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-body"><form><div class="form-group"><label>Department Name <span class="text-danger">*</span></label><input class="form-control" type="text"></div><div class="submit-section"><button class="btn btn-primary submit-btn">Submit</button></div></form></div></div></div></div>