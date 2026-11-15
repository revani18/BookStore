import { useCallback, useMemo, useRef, useState } from "react";
import AlertModal from "../components/AlertModal";
import { ModalContext } from "./modal-context";

const notificationDefaults = {
  success: { title: "Berhasil", icon: "fa-circle-check" },
  error: { title: "Terjadi Kesalahan", icon: "fa-circle-xmark" },
  warning: { title: "Peringatan", icon: "fa-triangle-exclamation" },
  info: { title: "Informasi", icon: "fa-circle-info" },
};

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);
  const nextId = useRef(0);
  const confirmationResolver = useRef(null);

  const settleConfirmation = useCallback((confirmed) => {
    const resolve = confirmationResolver.current;
    confirmationResolver.current = null;
    resolve?.(confirmed);
  }, []);

  const showModal = useCallback(
    (message, type = "info", options = {}) => {
      settleConfirmation(false);
      nextId.current += 1;
      const defaults = notificationDefaults[type] || notificationDefaults.info;

      setModal({
        id: nextId.current,
        kind: type,
        type,
        tone: options.tone || type,
        title: options.title || defaults.title,
        icon: options.icon || defaults.icon,
        message,
        onOk: options.onOk,
      });
    },
    [settleConfirmation],
  );

  const confirmModal = useCallback(
    (options) =>
      new Promise((resolve) => {
        settleConfirmation(false);
        confirmationResolver.current = resolve;
        nextId.current += 1;
        setModal({
          id: nextId.current,
          kind: "confirmation",
          tone: options.tone || "confirmation",
          title: options.title || "Konfirmasi tindakan",
          icon: options.icon || "fa-triangle-exclamation",
          message: options.message,
          confirmText: options.confirmText,
          cancelText: options.cancelText,
          confirmButtonClass: options.confirmButtonClass,
        });
      }),
    [settleConfirmation],
  );

  const closeModal = useCallback(() => {
    setModal(null);
    settleConfirmation(false);
  }, [settleConfirmation]);

  const confirmCurrentModal = useCallback(() => {
    const onOk = modal?.onOk;
    setModal(null);
    settleConfirmation(true);
    onOk?.();
  }, [modal, settleConfirmation]);

  const value = useMemo(
    () => ({ showModal, confirmModal }),
    [showModal, confirmModal],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AlertModal
        modal={modal}
        onClose={closeModal}
        onConfirm={confirmCurrentModal}
      />
    </ModalContext.Provider>
  );
}
