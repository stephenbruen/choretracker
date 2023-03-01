import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import { useParams} from 'react-router-dom';


const HomePage = () => {
    const [jobs, setJobs] = useState([])
    const [user, setUser] = useState([])
    const {id} = useParams();
    const navigate = useNavigate()
    //delete function did not work
    const onDeleteHandler = (jobId) => {
        axios.delete('http://localhost:8000/api/job/' + jobId)
        .then((res) => {
            console.log("Successfully deleted job");
            console.log(res);
            const filterJob = jobs.filter((job) => {
                return job._id !== jobId;
            })
            setJobs(filterJob);
        })
        .catch((err) => {
            console.log("failed to delete job", err.response)
        })
    }
    
    useEffect(()=> {
        axios.get('http://localhost:8000/api/dashboard')
        .then(res=> setJobs(res.data))
        .catch(err => console.log(err))
    },[])
    //need to configure this in controller to show logged in user jobs as "my jobs"
    useEffect(()=> {
        axios.get('http://localhost:8000/api/viewUserJob')
        .then(res => {
            console.log(res)
            setUser(res.data)})
        .catch(err=> console.log(err))
    },[])


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
                            <Nav.Link href = '' onClick = {onLogout} className = "links">Logout</Nav.Link>
                        </Nav>
                </Container>
            </Navbar>
            <div className='home-body'>
                <div className='l-control'>
                    <div className='l-table'>
                        <Table className = "job-table" striped bordered hover>
                            <thead>
                                <tr className='table'>
                                    <th>Job</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                                
                                {
                                    jobs.map((job, idx)=> {
                                        return <tr className='table-content' key={idx}>
                                            <td>{job.title}</td>
                                            <td>{job.location}</td>
                                            <td><a onClick={(e)=> navigate('/view/' + job._id)}href=''>View</a></td>
                                            <td><a onClick={(e)=> navigate('./addJob')}href=''>Add</a></td>
                                            <td><a onClick={(e)=> navigate('/edit/' +job._id)}href=''>Edit</a></td>
                                            <td><a onClick = {(e) => onDeleteHandler(job._id)} href=''>Cancel</a></td>
                                        </tr>
                                    })
                                }
                                
                            </thead>
                        </Table>
                    </div>
                </div>
                <div className='r-control'>
                    <div className='r-bottom'>
                        <Table className = "other-job" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>My Jobs</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                        {
                                            user.map((job, idx)=> {
                                                return (
                                                <tr key ={idx} className='user-table'>
                                                    <td>{job.title}</td>
                                                    <td><a onClick={(e)=> navigate('/view/' + job._id)} href=''>View</a></td> 
                                                    <td><a href=''>Done</a></td>
                                                </tr>
                                                )
                                            })
                                        }
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default HomePage