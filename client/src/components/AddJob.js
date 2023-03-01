import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const AddJob = () => {
    const [jobs, setJobs] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [errMsg, setErrMsg] = useState({})

    const navigate = useNavigate();

    const onJobAddition = (e) => { 
        e.preventDefault();
        axios.post("http://localhost:8000/api/addJob", {
            title, description, location
        },{withCredentials:true})
        .then(res => {
            console.log(res.data);
            setJobs([...jobs, res.data]);
            setTitle("");
            setDescription("");
            setLocation("");
            navigate('/home');
        })
        .catch(err => {
            console.log(err.response.data.error.errors);
            setErrMsg(err.response.data.error.errors);
        })
    }
        const onLogout = (e) => {
            axios.get('http://localhost:8000/api/logout')
            .then(navigate('/'))
            .catch(err => console.log(err))
        
        }
        const handleTitle = (e) => {
            setErrMsg("");
            setTitle(e.target.value);
        }
        const handleDescription = (e) => {
            setErrMsg("");
            setDescription(e.target.value);
        }
        const handleLocation = (e) => {
            setErrMsg("");
            setLocation(e.target.value);
        }
    

    return (
    <div className='container'>
        <Navbar expand = "lg">
                <Container id = "nav-bar-container">
                    <Navbar.Brand href = "/home"><h2 className = "title">Chore Tracker</h2></Navbar.Brand>
                        <Nav className = "me-auto">
                            <Nav.Link href = "/home" className = "links">Back</Nav.Link>
                            <Nav.Link href = '' onClick = {onLogout} className = "links">Logout</Nav.Link>
                        </Nav>
                </Container>
        </Navbar>

        <div>
            <h2>Add a Job</h2>
        </div>

        <Form onSubmit={onJobAddition}>
            <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalTitle">
                {errMsg.title ? <p className = "errors">{errMsg.title.message}</p> : null}
                <Form.Label column sm = {2}>
                    Title
                </Form.Label>
                <Col sm = {10}>
                    <Form.Control type='text' value={title} onChange={handleTitle} />
                </Col>
            </Form.Group>

            <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalDescription">
                {errMsg.description? <p className = "errors">{errMsg.description.message}</p> : null}
                <Form.Label column sm = {2}>
                    Description
                </Form.Label>
                <Col cm = {10}>
                    <Form.Control as = "textarea" rows = {3} value={description} onChange={handleDescription} />
                </Col>
            </Form.Group>

            <Form.Group as = {Row} className = "mb-3" controlId = "formHorizontalLocation">
                {errMsg.location? <p className = "errors">{errMsg.location.message}</p> : null}
                <Form.Label column sm = {2}>
                    Location
                </Form.Label>
                <Col sm = {10}>
                    <Form.Control type='text' value={location} onChange={handleLocation} />
                </Col>
            </Form.Group>
            
            <Button variant = "primary" type = "submit" className = "btn">Submit</Button>            
        </Form>
    </div>
    )
}


export default AddJob