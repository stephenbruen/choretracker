import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css';


const AddJob = () => {
    const [jobs, setJobs] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [errMsg, setErrMsg] = useState({})

    const navigate = useNavigate();

    const onJobAddition = (e) => { 
        e.preventDefault();
        axios.post("http://localhost:8000/api/addJob", {
            title, description, location
        })
        .then(res => {
            console.log(res.data);
            setJobs([...jobs, res.data]);
            setTitle("");
            setDescription("");
            setLocation("");
            navigate('/dashboard');
        })
        .catch(err => {
            console.log(err.response.data.error.errors);
            setErrMsg(err.response.data.error.errors);
        })
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
        <form onSubmit={onJobAddition}>
        <div className='nav-bar'>
            <h2>Add a Job</h2>
            {// need location for logout
            }
            <ul className='list-control'>
                <Link to='/dashboard'>back</Link>
                <Link to='/'>logout</Link>
            </ul>
        </div>
        <div className='body'>
            <div className='form'>
                <div className='form-control'>
                {errMsg.title? <p>{errMsg.title.message}</p> : null}
                <label htmlFor='title'>Title</label>
                <input type='text' value={title} onChange={handleTitle} />
                </div>
                <div className='form-control'>
                {errMsg.description? <p>{errMsg.description.message}</p> : null}
                <label htmlFor='description'>Description</label>
                <input type='text' value={description} onChange={handleDescription} />
                </div>
                <div className='form-control'>
                {errMsg.location? <p>{errMsg.location.message}</p> : null}
                <label htmlFor='location'>Location</label>
                <input type='text' value={location} onChange={handleLocation} />
                </div>
                <div className='submit-btn'>
                <input className='btn'type="submit"/>
                </div>
            </div>
        </div>
        </form>
    </div>
    )
}


export default AddJob