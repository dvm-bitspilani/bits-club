import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";
import editModal from "../../Club Page/components/Modal/EventEditModal.module.css";

export default function EventModal( onClose, handleEventClick){
    return(
        <>
        {createPortal(
            <div className={editModal.editModalContainer}>
                xyz
            </div>
        )
        }
        </>
    )
}