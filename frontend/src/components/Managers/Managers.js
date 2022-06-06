import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchData } from '../../shared/fetch-data'
import './Managers.css'

function Managers() {
    const [managers, setManagers] = useState([])
    const [manager, setManager] = useState({
        name: '',
        email: '',
        address: '',
    })
    useEffect(() => {
        const res = fetchData('http://localhost:4000/api/user/all')
        if(res.length){
            setManagers(res);
        }
    },[])

    const handleClickUpdate = (e) => {
        const id = e.target.key;
        const auxManager = managers.find(manager => manager.id === id);
        if(!auxManager) return;
        setManager(auxManager);
    }

    const handleChange = (e) => {
        setManager((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const getJSX = (managers) => {
        managers.map(manager => {
            return (
            <div className="card manager-setWidth" key={manager.id}>
                <div className="card-body">
                <h5 className="card-title">{manager.name}</h5>
                <h6 className="card-subtitle mb-4 text-muted">{manager.id}</h6>
                <p className="card-text">{manager.email}</p>                
                <p className="card-text">{manager.address}</p>
                <p>
                    <button className="btn btn-success set-margin-4">Update</button>
                    <button className="btn btn-danger">Delete</button>
                </p>
                </div>
            </div>
          )
        })
    }
  return (
    <div className="login-form-container managers-container">
        {/*managers.length ? getJSX(managers) : <p className='info'>There are no managers yet</p> */}
        
        <div className="manager-setWidth">
                <div className="card-body">
                <h5 className="card-title">Ahmed</h5>
                <h6 className="card-subtitle mb-4 text-muted">1245678</h6>
                <p className="card-text">email@email.commlj</p>                
                <p className="card-text">Mannouba</p>
                <p>
                <button type="button" key={manager.id} onClick={handleClickUpdate} className="btn btn-success set-margin-4" data-toggle="modal" data-target="#exampleModal">
  Update
</button>
                    <button className="btn btn-danger">Delete</button>
                </p>
                </div>
            </div>


            <div className="manager-setWidth">
                <div className="card-body">
                <h5 className="card-title">Ahmed</h5>
                <h6 className="card-subtitle mb-4 text-muted">1245678</h6>
                <p className="card-text">email@email.commlj</p>                
                <p className="card-text">Mannouba</p>
                <p>
                    <button className="btn btn-success set-margin-4">Update</button>
                    <button className="btn btn-danger">Delete</button>
                </p>
                </div>
            </div>

        <div className="manager-setWidth">
                <div className="card-body">
                <h5 className="card-title">Ahmed</h5>
                <h6 className="card-subtitle mb-4 text-muted">1245678</h6>
                <p className="card-text">email@email.commlj</p>                
                <p className="card-text">Mannouba</p>
                <p>
                    <button className="btn btn-success set-margin-4">Update</button>
                    <button className="btn btn-danger">Delete</button>
                </p>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update manager</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form onSubmit={handleSubmit}>
  <div className="form-group mt-4">
    <label for="name">Name</label>
    <input type="text" className="form-control"value={manager.name} name="name" onChange={handleChange} id="title" placeholder="Enter name" />
  </div>

  <div className="form-group mt-4">
    <label for="email">Email</label>
    <input type="email" className="form-control"value={manager.email} name="email" onChange={handleChange} id="email" placeholder="Enter email" />
  </div>

  <div className="form-group mt-4">
    <label for="password">Password</label>
    <input type="password" className="form-control"  name="password" onChange={handleChange} id="password" placeholder="Enter password" />
  </div>

  <div className="form-group mt-4">
    <label for="addresse">Addresse</label>
    <input type="text" className="form-control"value={manager.address} name="addresse" onChange={handleChange} id="address" placeholder="Enter address" />
  </div>




</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="sumbit" onClick={handleSubmit} className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

    </div>
    
  )
}

export default Managers