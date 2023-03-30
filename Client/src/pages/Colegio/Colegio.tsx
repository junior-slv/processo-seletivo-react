import React from 'react'
import './Colegio.css'
import Sidebar from '../../components/Sidebar/Sidebar'

const Colegio = () => {
  return (
    <div className="colegio-container">
        <Sidebar/>
        <div className="colegio-content">
            <p>Colegio</p>
        </div>
    </div>
  )
}

export default Colegio