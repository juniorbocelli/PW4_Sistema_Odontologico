import { MODAL_CHANGE_DATA, MODAL_CHANGE_VISIBILITY } from "./actionsTypes";

const changeModalData = (value) => (
    {
        type: MODAL_CHANGE_DATA,
        payload: value
    }
);

const changeModalVisibility = (value) => (
    {
        type: MODAL_CHANGE_VISIBILITY,
        payload: value
    }
);

export { changeModalData, changeModalVisibility };