import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Button from 'react-bootstrap/Button'


const HomePage = () => {
    const [jobs, setJobs] = useState([])
    const [user, setUser] = useState([])
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
            <h1>welcome </h1>
            <Button onClick = {onLogout} variant = "primary">Logout</Button>
            <div className='home-body'>
                <div className='l-control'>
                    <div className='l-table'>
                        <table>
                            <thead>
                                <tr className='table'>
                                    <th>Job</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='table-body'>
                                {
                                    jobs.map((job, idx)=> {
                                        return <div className='table-content' key={idx}>
                                            <td>{job.title}</td>
                                            <td>{job.location}</td>
                                            <ul>
                                                <li>
                                                <a onClick={(e)=> navigate('/view/' + job._id)}href=''>view</a>
                                                <a onClick={(e)=> navigate('./addJob')}href=''>add</a>
                                                <a onClick={(e)=> navigate('/edit/' +job._id)}href=''>edit</a>
                                                {// delete functionality on last onClick
                                                }
                                                <a onClick = {() => onDeleteHandler(job._id)} href=''>cancel</a>
                                                </li>
                                            </ul>
                                        </div>
                                    })
                                }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='r-control'>
                    <div className='r-top'>
                        <button onClick={(e)=> navigate('/addJob')}>Add Job</button>
                    </div>
                    <div className='r-bottom'>
                        <table>
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
                                                <div key ={idx} className='user-table'>
                                                    <td>{job.title}</td>
                                                    <a onClick={(e)=> navigate('/view/' + job._id)} href=''>view</a>
                                                    <a href=''>done</a>
                                                </div>
                                                )
                                            })
                                        }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default HomePage