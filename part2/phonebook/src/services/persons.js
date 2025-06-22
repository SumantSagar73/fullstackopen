import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'


const getAll = () =>{
  return axios.get(baseUrl)

}

const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)

}

const update = (id, newObject) =>{
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

  
  const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
  }



export default 
{getAll, create, update, remove}