export const initState = {
    loading: true,
    error: '',
    messages: [],
}

export const messageReducer = (state, action) => {
    switch(action.type){
        case 'FETCH_HISTORY_SUCCESS':
            
            return {
                loading: false,
                error: '',
                messages: action.payload
            }
        case 'FETCH_HISTORY_FAILURE':
            return {
                loading: false,
                error: 'Something went wrong',
                messages: []
            }
        case 'UPDATE_LIVE_MESSAGE':
            console.log('update', action.payload)
            return {
                loading: false,
                error: '',
                messages: [...state.messages, action.payload]
            }
    }
}