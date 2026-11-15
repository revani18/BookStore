import { useEffect, useRef } from "react";

const modalStyles = {
  success: {
    color: "text-success",
    background: "bg-success-subtle",
    icon: "fa-circle-check",
  },
  error: {
    color: "text-danger",
    background: "bg-danger-subtle",
    icon: "fa-circle-xmark",
  },
  danger: {
    color: "text-danger",
    background: "bg-danger-subtle",
    icon: "fa-circle-xmark",
  },
  warning: {
    color: "text-warning-emphasis",
    background: "bg-warning-subtle",
    icon: "fa-triangle-exclamation",
  },
  info: {
    color: "text-primary",
    background: "bg-primary-subtle",
    icon: "fa-circle-info",
  },
  confirmation: {
    color: "text-danger",
    background: "bg-danger-subtle",
    icon: "fa-trash-can",
  },
};

export default function AlertModal({ modal, onClose, onConfirm }) {
  const actionButtonRef = useRef(null);

  useEffect(() => {
    if (!modal) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    actionButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && modal.kind === "confirmation") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modal, onClose]);

  if (!modal) return null;

  const isConfirmation = modal.kind === "confirmation";
  const style =
    (modal.kind === "confirmation" &&
      (modalStyles[modal.tone] || modalStyles.confirmation)) ||
    modalStyles[modal.tone] ||
    modalStyles[modal.type] ||
    modalStyles.info;
  const headingId = `notification-modal-title-${modal.id}`;

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        tabIndex="-1"
        onClick={(event) => {
          if (event.target === event.currentTarget && isConfirmation) {
            onClose();
          }
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow rounded-4">
            <div className="modal-header border-0 justify-content-center pt-4 pb-0">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center ${style.background}`}
                style={{ width: "4rem", height: "4rem" }}
              >
                <i
                  className={`fa-solid ${modal.icon || style.icon} ${style.color} fs-3`}
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="modal-body text-center px-4 pt-3">
              <h5 className="modal-title fw-bold mb-2" id={headingId}>
                {modal.title}
              </h5>
              <p className="text-body-secondary mb-0 text-break">
                {modal.message}
              </p>
            </div>

            <div className="modal-footer border-0 justify-content-center gap-2 pt-0 pb-4">
              {isConfirmation ? (
                <>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={onClose}
                  >
                    {modal.cancelText || "Batal"}
                  </button>
                  <button
                    ref={actionButtonRef}
                    type="button"
                    className={`btn ${modal.confirmButtonClass || "btn-danger"} px-4`}
                    onClick={onConfirm}
                  >
                    {modal.confirmText || "Konfirmasi"}
                  </button>
                </>
              ) : (
                <button
                  ref={actionButtonRef}
                  type="button"
                  className="btn btn-primary px-4"
                  onClick={onConfirm}
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
