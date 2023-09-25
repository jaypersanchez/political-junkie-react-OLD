import React, {useState, useEffect, useHistory} from 'react'
import NavBar from './Navbar'
import axios from 'axios'
import {Link} from 'react-router-dom'

function CreateGroup() {

    const profile_id = sessionStorage.getItem("profile_id")
    const [owner,setowner]=useState(profile_id);
    const [groupname,setgroupname] = useState('');
    const [groupdesc, setgroupdesc] = useState('')
    const [privacy,setprivacy] = useState('public')
    const [nomembers,setnomembers]=useState(0)
    const [msg,setmsg]=useState('')
    const history = useHistory()
    

    function createGroup(e) {

        e.preventDefault()
        const group = {
          owner:owner,
          name:groupname,
          desc:groupdesc,
          privacy:privacy,
          no_members:nomembers
        }
        console.log("data: " + group)
        axios.post('/createnewgroup', group)
        .then(history.push('/mygroups'))
        .catch(err=>console.log(err))
    }

    /*useEffect(()=>{
        history.push('/posts')
    })*/

    return (
        <div>
           <NavBar /> 
           
            <div className='container mt-5'>
            <h2 className='m-5 text-center'>Add New Post</h2>
                <form  className='col-md-6 mx-auto' onSubmit={createGroup}>
                <h5 className='p-3 text-center text-white'>{msg}</h5>
                                <div className="form-group">
                                    <label>Group Name</label>
                                    <input 
                                    type="text" 
                                    value={groupname} 
                                    className="form-control" 
                                    onChange={(e)=>{setgroupname(e.target.value)}} 
                                    placeholder="Enter Group Name" required />
                                </div>
                                <div className="form-group">
                                <label>Description of the Group</label>
                                    <textarea 
                                    type="text" 
                                    value={groupdesc} 
                                    className="form-control" 
                                    onChange={(e)=>{setgroupdesc(e.target.value)}} 
                                    placeholder="Describe the purpose of this group" />
                                </div>

                                <button type="submit" className="btn btn-primary">Create Group</button>
                                <Link to='/posts' className='btn btn-dark ml-4'>Back to Home</Link>
                </form>
                
            </div>
        </div>
    )
}

export default CreateGroup
