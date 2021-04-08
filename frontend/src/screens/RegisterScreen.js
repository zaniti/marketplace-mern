import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';


export default function RegisterScreen(props) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [adresse, setAdresse] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state=> state.userRegister);
    const {loading, userInfo, error} = userRegister;

    const dispatch = useDispatch();
    

    useEffect(() => {
      if(userInfo){
        props.history.push("/signin");
        alert('Please Check email confirmation !')
      }     
        return () => {
            //
        }
    }, [userInfo]);

    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name,lastName,phone,email,password,adresse))
    }

    

    return(<div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Create Account</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor="name">
                Name
              </label>
              <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="lastName">
                lastName
              </label>
              <input type="text" name="lastName" id="lastName" onChange={(e) => setLastName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="phone">
                Phone
              </label>
              <input type="tel" name="Phone" id="Phone" onChange={(e) => setPhone(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                Email
              </label>
              <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="adresse">
                Adresse
              </label>
              <input type="text" name="adresse" id="adresse" onChange={(e) => setAdresse(e.target.value)}>
              </input>
            </li>
            <li>
              <button type="submit" className="btn btn-primary">Register</button>
            </li>
            <li>
              Already have an account?
              
              <Link to="/signin" className="btn btn-success text-center" >Sign-in</Link>
            
            </li>
           
          </ul>
        </form>
      </div>)
    
}
