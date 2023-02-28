import {useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate} from 'react-router-dom';

const EditJob = (props) => {
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [errMsg, setErrMsg] = useState({});

    const navigate = useNavigate();

    useEffect ( () => {
        axios.get(`http://localhost:8000/api/view/${id}`)
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setLocation(response.data.location);
        })
        .catch((err) => {
            console.log(err.response);
        })
    }, [id]);


    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8000/api/edit/${id}`, {
            title,
            description,
            location,
        })
        .then((response) => {
            console.log(response);
            console.log(response.data);
            navigate("/home");
        })
        .catch((err) => {
            console.log(err.response.data.error.errors);
            setErrMsg(err.response.data.error.errors);
        });
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
        <div>
            <div>
                <h1>Edit this Job</h1>
                <Link to = {'/home'}>Back</Link>
            </div>
            <form onSubmit={onSubmitHandler}>
                <div className='body'>
                    <div className='form'>
                        <div className='form-control'>
                        {errMsg.title ? <p>{errMsg.title.message}</p> : null}
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
                        <input className='btn'type="submit" value = "Submit"/>
                        </div>
                    </div>
                </div>
        </form>
    </div>

    )
}

export default EditJob