import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const ViewJobs = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [location, setLocation] = useState()
    const [viewJob, setViewJob] = useState({})
    const [jobs, setJobs] = useState({})
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=> {
        axios.get('http://localhost:8000/api/view/' + id)
        .then((res)=> {
            console.log(res.data)
            setTitle(res.data.title)
            setDescription(res.data.title)
            setLocation(res.data.jobs)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    useEffect(()=> {
        axios.get('http://localhost:8000/api/view/' + id)
        .then(res => setViewJob(res.data))
        .catch(err=> console.log(err))
    },[])

    const Jobs = {
        title, description, location
    }

    const addToUserJobs = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/userJob', Jobs)
        .then(res=> {
            console.log(res.data)
            setJobs(res.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    const onLogout = (e) => {
        axios.get('http://localhost:8000/api/logout')
        .then(navigate('/'))
        .catch(err => console.log(err))
    
    }

    return (
        <div className='container'>
            <Navbar expand = "lg">
                <Container id = "nav-bar-container">
                    <Navbar.Brand href = "/home"><h2 className = "title">Chore Tracker</h2></Navbar.Brand>
                        <Nav className = "me-auto">
                            <Nav.Link href = "/addjob" className = "links">Add a Job</Nav.Link>
                            <Nav.Link href = "/home" className = "links">Back</Nav.Link>
                            <Nav.Link href = '' onClick = {onLogout} className = "links">Logout</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>
            <div className='view-top'>
                <h2>{jobs.title}</h2>
            </div>
            <div className = "view-container">
                <div className='view-body'>
                    <h2>{viewJob.description}</h2>
                    <h2>Location: {viewJob.location}</h2>
                </div>
                <div className='view-bottom'>
                    <h2>
                    <Link onClick={addToUserJobs} className = "btn">Add to My Jobs</Link>
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default ViewJobs