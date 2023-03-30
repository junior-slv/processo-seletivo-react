import React from 'react'
import './Salas.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Salas = () => {
  return (
    <div className="salas-container">
        <Sidebar/>
        <div className="salas-content">
            <p>Salas</p>
        </div>
    </div>
  )
}

export default Salas