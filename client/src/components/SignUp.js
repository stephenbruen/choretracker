import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errMsg, setErrMsg] = useState({})
    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        })
        .then(res => {
            console.log(res)
            console.log(res.data)
            navigate('/')

        })
        .catch(err => {
            console.log(err.response.data.error.errors);
            setErrMsg(err.response.data.error.errors);
        })
    }

    const fNameHandler = (e) => {
        setErrMsg("");
        setFirstName(e.target.value);
    }
    const lNameHandler = (e) => {
        setErrMsg("");
        setLastName(e.target.value);
    }
    const emailHandler = (e) => {
        setErrMsg("");
        setEmail(e.target.value);
    }
    const passwordHandler = (e) => {
        setErrMsg("");
        setPassword(e.target.value);
    }
    const confirmPasswordHandler = (e) => {
        setErrMsg("");
        setConfirmPassword(e.target.value);
    }

    return (
        <div>
            <h1>Sign Up!</h1>
            <Form className = "style" onSubmit = {onSubmitHandler}>
                <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalFirstName">
                    {errMsg.firstName? <p>{errMsg.firstName.message}</p> : null}
                    <Form.Label column sm = {2}>
                        First Name
                    </Form.Label>
                    <Col sm = {10}>
                        <Form.Control type='text' value={firstName} onChange={fNameHandler} />
                    </Col>
                </Form.Group>
                
                <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalLastName">
                    {errMsg.lastName? <p>{errMsg.lastName.message}</p> : null}
                    <Form.Label column sm = {2}>
                        Last Name
                    </Form.Label>
                    <Col sm = {10}>
                        <Form.Control type='text' value={lastName} onChange={lNameHandler} />
                    </Col>
                </Form.Group>
                
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
                        <Form.Control type='password' value={password} onChange={passwordHandler} />
                    </Col>
                </Form.Group>
                
                <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalConfirmPassword">
                    {errMsg.confirmPassword? <p>{errMsg.confirmPassword.message}</p> : null}
                    <Form.Label column sm= {2}>
                        Confirm Password
                    </Form.Label>
                    <Col sm = {10}>
                        <Form.Control type='password' value={confirmPassword} onChange={confirmPasswordHandler} />
                    </Col>
                </Form.Group>
                
                <Button variant = "primary" type = "submit">Sign Up</Button>
            </Form>
        </div>
    )
}

export default SignUp