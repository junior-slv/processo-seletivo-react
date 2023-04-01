import React, { useEffect, useState } from 'react'
import './Dashnoard.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from 'axios';
import { array, object } from 'yup';

const url = "http://localhost:3001/api/users/allusers"
type users = {
  id: number,
  userLogin: string,
  userPassword: string,
}

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  useEffect(() => {
    axios.get<users>(url)
    .then(response => {
      const data:any = Object.values(response.data)[0];
      setUser(data?.userLogin)
      // o array de objetos
      console.log(user);
      
      console.log(data); // exibe o array no console
      
    })
         .catch((err) => {
      console.log(err);
    })
  

  }, [])
  
  return (

    <div className="dashboard-container">
      <Sidebar/>
      <div className="dashboard-content">
        <p>{user}</p>
        <p>{pass}</p>
      </div>
    </div>
  )
}

export default Dashboard