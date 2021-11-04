import axios from "axios";

export const authAPI={
    getUserInfo: async (body)=>{
        return await axios.post("https://media-player-be.herokuapp.com/api/users/login",body);
    }
}