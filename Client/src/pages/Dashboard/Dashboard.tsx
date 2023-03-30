import React from 'react'
import './Dashnoard.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Dashboard = () => {
  return (

    <div className="dashboard-container">
      <Sidebar/>
      <div className="dashboard-content">
        <p>teste</p>
      </div>
    </div>
  )
}

export default Dashboard