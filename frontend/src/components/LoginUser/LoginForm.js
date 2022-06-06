import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { login } from '../../redux/auth/authSlice';
import './LoginForm.css'
function LoginForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {user, isError,isSuccess, message} = useSelector(state => state.auth);
  const [formData,setFormData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    if(user || isSuccess){
      if(isSuccess){
        toast.success(`Hello ${user.name}`)
      }
      navigate('/')
    }
  })


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const loginUser = (e) => {
    e.preventDefault();
    if(!formData.email){
      toast.error('Email is required');
      return;
    }
    if(!formData.password){
      toast.error('Password is required');
      return;
    }
    dispatch(login(formData));

  }

  return (
    <div className="login-form-container">
    <form onSubmit={loginUser}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" name="email" onChange={handleChange} id="email" aria-describedby="emailHelp" />
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" name="password" id="password" onChange={handleChange} />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default LoginForm