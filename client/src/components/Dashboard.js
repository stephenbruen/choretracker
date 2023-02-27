import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';

const Dashboard = () => {
    const [jobs, setJobs] = useState([]);

    useEffect (() => {
        axios.get("http://localhost:8000/api/dashboard")
        .then ((res) => setJobs(res.data))
        .catch ((err) => console.log(err))
    }, [])

    return (
        <div>
            <h1>Welcome insert_name_here</h1>
            <Link to = {'/'}>Logout needs_function</Link>
            <div>
                <Link to = {'/addjob'}>Add a Job</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Job</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                    {
                        jobs.map((job, index) => (
                            <tr key = {index}>
                                <td>{job.title}</td>
                                <td>{job.location}</td>
                                <td>
                                    <Link to = {`/view/${job._id}`}>View</Link>
                                </td>
                            </tr>
                        ))
                    }
                </thead>

            </Table>
            <Table striped bordered hover>
                <thead>
                    <th>My Jobs</th>
                </thead>
                <p>needs function</p>
            </Table>
            
        </div>
    )
}

export default Dashboard