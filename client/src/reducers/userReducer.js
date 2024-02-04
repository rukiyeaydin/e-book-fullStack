export const initialState = null

export const reducer = (state, action) => {
    if(action.type == "USER"){
        return action.payload
    }
    if(action.type == "CLEAR"){
        return null
    }
    if(action.type == "UPDATEPIC"){
        return{
            ...state,
            profilResmi: action.payload
        }
    }
    if(action.type == "UPDATEFIELDS"){
        return{
            ...state,
            username: action.payload.username,
            email: action.payload.email
        }
    }
    if(action.type == "UPDATE"){
        return {
            ...state,
            followers: action.payload.followers,
            following: action.payload.following,
        }
    }

    return state
} 