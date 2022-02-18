const initialState = {
    list: [],
    activeId: null
}

function hobbyReducer (state = initialState, action) {
    switch (action.type) {
        case 'ADD_HOBBY':{
            const newList = [...state.list];
            newList.push(action.payload)
            return {
                list: [...newList],
                activeId: null
            }
        }

        case 'SET_ACTIVE_HOBBY':{
            return {
                list: [...state.list],
                activeId: action.payload.id
            }
        }
        default:
            return state
    }
}

export default hobbyReducer