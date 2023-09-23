import axios from "axios";

const service=axios.create({
    baseURL:"http://localhost:3001"
})

export default service

//https://fmnc.pocketfriendlyweb.com