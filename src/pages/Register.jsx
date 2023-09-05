import axios from 'axios'
import React, { useState } from 'react'
import '../styles/Register.scss'
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        fullName: '',
        email: '',
        contact: '',
        password: "",
        organisation: "",
        registrationNo: '',
        branchName: "",
        branchCode: "",
        branchAddress: ""
    })

    const {
        fullName,
        email,
        contact,
        password,
        organisation,
        registrationNo,
        branchName,
        branchCode,
        branchAddress
    } = userDetails

    const handleInput = (event) => {
        const { name, value } = event.target
        setUserDetails({ ...userDetails, [name]: value })
    }

    const submitForm = async (e) => {
        e.preventDefault()

        const newUserdetails = {
            fullName: userDetails.fullName,
            email: userDetails.email,
            contact: userDetails.contact,
            password: userDetails.password,
            organisation: userDetails.organisation,
            registrationNo: userDetails.registrationNo,
            branchName: userDetails.branchName,
            branchCode: userDetails.branchCode,
            branchAddress: userDetails.branchAddress
        }
        const res = axios.post(`${process.env.REACT_APP_URL}/register`, newUserdetails).then((res) => {
            console.log(res);
            setUserDetails({
                fullName: '',
                email: '',
                contact: '',
                password: "",
                organisation: "",
                registrationNo: '',
                branchName: "",
                branchCode: "",
                branchAddress: ""
            })
            if(res.data.status !== "failed"){
            navigate('/login')
            }
        }).catch((err) => {
            console.log(err);
        })

    }
    return (
        <div className='login_container'>
            <div className="login_form">
                <div className="title">
                    <h4>Register with us</h4>
                </div>
                <div className="form">
                    <form action="" onSubmit={submitForm}>
                        <div className="form_container">
                            <input type="text" name="fullName" value={fullName} placeholder="Full Name" onChange={handleInput} />
                        </div>
                        <div className="form_container">
                            <input style={{ width: '48%', marginRight: '14px' }} type="number" name="contact" value={contact} placeholder="Contact No." onChange={handleInput} />
                            <input style={{ width: '48%' }} type="email" name="email" value={email} placeholder="email" onChange={handleInput} />
                        </div>
                        <div className="form_container">
                            <input type="password" name="password" value={password} placeholder="Password" onChange={handleInput} />
                        </div>
                        <div className="form_container">
                            <input type="text" name="organisation" value={organisation} placeholder="Organisation Name" onChange={handleInput} />
                        </div>
                        <div className="form_container">
                            <input type="number" name="registrationNo" value={registrationNo} placeholder="Registration No." onChange={handleInput} />                        </div>
                        <div className="form_container">
                            <input style={{ width: '48%', marginRight: '14px' }} type="text" name="branchName" value={branchName} placeholder="Branch Name" onChange={handleInput} />
                            <input style={{ width: '48%' }} type="text" name="branchCode" value={branchCode} placeholder="Branch Code" onChange={handleInput} />
                        </div>
                        <div className="form_container">
                            <input type="text" name="branchAddress" value={branchAddress} placeholder="Branch Address" onChange={handleInput} />
                        </div>
                        <div className="form_container">
                            <input className='submit_button' type="submit" value="Submit" onChange={handleInput} />
                        </div>
                    </form>
            <p>Already logged In? <Link to={'/login'}>Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register