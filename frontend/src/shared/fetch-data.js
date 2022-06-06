import axios from "axios"

export const fetchData = async (url) => {
    const response = await axios.get(url);
    if(response.data) return response.data;
    return [];
}