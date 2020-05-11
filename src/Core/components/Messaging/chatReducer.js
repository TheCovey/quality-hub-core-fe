export const initState = {
    loading: true,
    error: '',
    messages: []
}

export const messageReducer = (state, action) => {
    switch(action.type){
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                error: '',
                messages: action.payload
            }
        case 'FETCH FAILURE':
            return {
                loading: false,
                error: 'Something went wrong',
                messages: []
            }
    }
}