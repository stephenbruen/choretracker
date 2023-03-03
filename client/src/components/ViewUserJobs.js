import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useNavigate} from 'react-router-dom'



const ViewUserJobs = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [viewJob, setViewJob] = useState({})
    useEffect(()=> {
        axios.get('http://localhost:8000/api/oneUserJob/' + id)
        .then(res =>  {
            console.log(res.data)
            setViewJob(res.data)})
        .catch(err=> console.log(err))
    },[])

    return (
        <div className='container'>
            <div className='view-userTop'>
                <h2>{viewJob.title}</h2>
            <div>
                <ul className='user-job-btns'>
                    <a onClick={(e)=> navigate('/home')} href=''>back</a>
                    <a href=''>logout</a>
                </ul>
            </div>
            </div>
            <div className='view-container'>
                <div className='view-body'>
                    <h2>{viewJob.description}</h2>
                    <h2>Location : {viewJob.location}</h2>
                </div>
            </div>
        </div>
            
    )
}

export default ViewUserJobs