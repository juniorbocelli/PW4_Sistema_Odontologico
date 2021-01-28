import {MODAL_CHANGE_DATA, MODAL_CHANGE_VISIBILITY} from "../actions/actionsTypes";

const initialState = {
    title: "", 
    body: "", 
    closeBtnTxt: "Fechar", 
    actionBtnTxt: "Salvar",
    closeBtnVisibility: true,
    actionBtnVisibility: false,
    show: false
}

const dialogModalReducer = (state = initialState, action) => {
    switch(action.type) {
        case MODAL_CHANGE_DATA:
            return {
                ...state,
                title: action.payload.title,
                body: action.payload.body,
                closeBtnTxt: action.payload.closeBtnTxt,
                actionBtnTxt: action.payload.actionBtnTxt,
                closeBtnVisibility: action.payload.closeBtnVisibility,
                actionBtnVisibility: action.payload.actionBtnVisibility
            }

        case MODAL_CHANGE_VISIBILITY:
            return {
                ...state,
                //show: action.show
                show: action.payload
            }
        
        default:
            return state;
    }
}

export { dialogModalReducer };