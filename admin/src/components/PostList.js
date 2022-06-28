import { useNavigate } from "react-router-dom";
import {useParams } from 'react-router-dom'
import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://blooming-peak-71078.herokuapp.com',
    withCredentials:true
  });

const PostList = (props) => {
    const navigate = useNavigate();

    const { id } = useParams()  
    console.log(id,"iddddddddddddddddddddddddddddddddddddd")

      return (
<h1>Post List</h1>
    )
}
export default PostList