import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { register } from '../../redux/auth/authSlice';
import './RegisterForm.css'
function RegisterForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isError,isSuccess, message} = useSelector(state => state.auth);
  const [formData,setFormData] = useState({
    email: '',
    password: '',
    address: '',
    name: '',

  })

  useEffect(() => {
      if(isError){
          toast.error(message)
      }
      if(isSuccess || user){
          if(isSuccess){
              toast.success(`Hello ${user.name}`)
          }
          //dispatch(reset())
          navigate('/')
      }
      //dispatch(reset)
  })


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const registerUser = (e) => {
    e.preventDefault();
    if(!formData.email){
      toast.error('Email is required');
      return;
    }
    if(!formData.password){
      toast.error('Password is required');
      return;
    }
    dispatch(register(formData));

  }

  return (
    <div className="login-form-container">
    <form onSubmit={registerUser}>

    <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" name="name" onChange={handleChange} id="name" />
  </div>



  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" onChange={handleChange} name='email' id="email" aria-describedby="emailHelp" />
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name="password" id="password" onChange={handleChange} />
  </div>


  <div class="mb-3">
    <label for="address" class="form-label">Address</label>
    <input type="text" class="form-control" onChange={handleChange} name="address" id="address" />
  </div>


  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default RegisterForm