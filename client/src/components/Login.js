import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState([])
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", {
            email,
            password
        }, {withCredentials:true})
        .then (res => {
            console.log(res)
            console.log(res.data)
            console.log(email, password)
            navigate('/home');    
        })
        .catch((err) => {
            console.log(err)
            const errorResponse = err.response.data.error.errors;
            const errorList = []

            for (const key of Object.key(errorResponse)) {
                errorList.push(errorResponse[key].message)
            }
            setErrMsg(errorList);
        })
    }

    const emailHandler = (e) => {
        setEmail(e.target.value);
    }
    const passwordHandler = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div>
            <div className = "top-bar">
                <h1>Welcome to Chore Tracker</h1>
            </div>
            <h1>Login</h1>
            {errMsg.map((err, index) => <p className = "errors" key = {index}>{err}</p>)}
            <Form className = "login-form" onSubmit = {onSubmitHandler}>
                <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalEmail">
                        
                        <Form.Label column sm = {2}>
                            Email
                        </Form.Label>
                        <Col sm = {10}>
                            <Form.Control type='email' value={email} onChange={emailHandler} />
                        </Col>
                </Form.Group>

                <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalPassword">
                        
                        <Form.Label column sm = {2}>
                            Password
                        </Form.Label>
                        <Col sm ={10}>
                            <Form.Control type='password' value={password} onChange={passwordHandler} />
                        </Col>
                </Form.Group>
                <Button variant = "primary" type = "submit" className = "login">Login</Button>
            </Form>
            <h3>Don't have an account?<Link to = {'/register'}> Sign Up</Link> here!</h3>
        </div>
    )
}

export default Login