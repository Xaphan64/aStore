// ASSETS

// STYLES
import "./ConfirmationModal.scss";

// LIBRARIES
import { Fragment } from "react";

// MISC

// COMPONENTS
import CustomButton from "../../../atoms/CustomButton";

// CONFIGURATION
const ConfirmationModal = (props) => {
  // PROPERTIES
  const { handleDelete, setModal, product, isPending } = props;

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="modal-background">
      <div className="modal-container">
        <span className="modal-title">
          Are you sure do you want to remove <span className="modal-product">{product.name} </span>product?
        </span>

        {isPending ? (
          <Fragment>
            <CustomButton disabled type="button" className="button-red" name="Deleting..." />

            <CustomButton disabled type="button" name="No" />
          </Fragment>
        ) : (
          <Fragment>
            <CustomButton type="button" className="button-red" name="Yes" onClick={() => handleDelete(product.id)} />

            <CustomButton type="button" name="No" onClick={() => setModal(false)} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
