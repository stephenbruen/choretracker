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
    const [errMsg, setErrMsg] = useState({})
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", {
            email,
            password
        })
        .then (res => {
            console.log(res)
            console.log(res.data)
            console.log(email, password)
            navigate('/home');
            
        })
    }

    const emailHandler = (e) => {
        setErrMsg("");
        setEmail(e.target.value);
    }
    const passwordHandler = (e) => {
        setErrMsg("");
        setPassword(e.target.value);
    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit = {onSubmitHandler}>
                <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalEmail">
                        {errMsg.email? <p>{errMsg.email.message}</p> : null}
                        <Form.Label column sm = {2}>
                            Email
                        </Form.Label>
                        <Col sm = {10}>
                            <Form.Control type='email' value={email} onChange={emailHandler} />
                        </Col>
                </Form.Group>

                <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalPassword">
                        {errMsg.password? <p>{errMsg.password.message}</p> : null}
                        <Form.Label column sm = {2}>
                            Password
                        </Form.Label>
                        <Col sm ={10}>
                            <Form.Control type='text' value={password} onChange={passwordHandler} />
                        </Col>
                </Form.Group>
                <Button variant = "primary" type = "submit">Login</Button>
            </Form>
            <h3>Don't have an account?<Link to = {'/register'}> Sign Up</Link> here!</h3>
        </div>
    )
}

export default Login