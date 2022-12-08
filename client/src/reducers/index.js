
const initialState = {
    series: [],
    login: {}
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case 'GET_INFO': 
            return {
                ...state,
                series: action.payload,
            }
            case 'POST_LOGIN': 
            return {
                ...state,
                login: action.payload,
            }
        default: return state            
    }
}

export default rootReducer;