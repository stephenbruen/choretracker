import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'


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
    return (
        <div className='container'>
            <div className='view-top'>
                <h2>{jobs.title}</h2>
                <ul>
                    <a onClick={(e)=> navigate('/home')} href=''>back</a>
                    <a href=''>logout</a>
                </ul>
            </div>
            <div className='view-body'>
                <h2>{viewJob.description}</h2>
            </div>
            <div className='view-bottom'>
                <h2>
                <Link onClick={addToUserJobs}>Add to My Jobs</Link>
                </h2>
            </div>
        </div>
    )
}

export default ViewJobs