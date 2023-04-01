import React, { useEffect, useState } from 'react'
import './Dashnoard.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import axios from 'axios';
import { array, object } from 'yup';


const Dashboard = () => {

  
  return (

    <div className="dashboard-container">
      <Sidebar/>
      <div className="dashboard-content">
      </div>
    </div>
  )
}

export default Dashboard