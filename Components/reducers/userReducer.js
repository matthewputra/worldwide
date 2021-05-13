import {types} from '../action'

const initialState = {
    currentUser: null,
    markedItems: [],
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LOGIN_USER:
            return {...state, currentUser: action.payload.user};
        case types.LOGOUT_USER:
            return {...state, currentUser: null};
        case types.MARK_ITEM:
            return {...state, markedItems: [...state.markedItems, action.payload.body]};
        case types.REMOVE_MARK: {
            const mark = state.markedItems.find(item => item.id == action.payload.id);
            
            if(!mark){
                return state;
            }
            
            const updatedItems = state.markedItems.filter(item  => item.id !== mark.id);
            return {...state, markedItems: updatedItems};
        }
        default:
            return state;
    }
}

export default userReducer;