import React from 'react';
import ConfirmModal from "./ConfirmModal";
import TemplateModal from "./TemplateModal";
import CanvasItemConfigModal from "./CanvasItemConfigModal";
import CreatePaletModal from "./Palet/CreateModal";
import UpdatePaletModal from "./Palet/UpdateModal";

const Modals = () => {

  return (
    <>
      <ConfirmModal />
      <TemplateModal />
      <CreatePaletModal />
      <UpdatePaletModal />
      <CanvasItemConfigModal />
    </>
  );
};

export default Modals;
