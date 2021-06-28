

export default (state={isPending: false}, action) => {
    switch(action.type){
        case PENDING:
            if(action.payload) return {...state, isPending: true}
            else return {...state, isPending: false}
        default:
            return state
    }
}