import React from 'react';
import moment from 'moment';
import "./task.css";
import { useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../Axios/axios.js"
import TokenContext from '../../context/TokenContext';
function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const{userToken} = useContext(TokenContext)
    const handleRemove = async(e) => {
        e.preventDefault();
        

        dispatch({
            type: "REMOVE_TASK",
            id
        })
        
        try{
             const result = await axios.post('/task/removeTask',{"id":task._id},{
                headers: {
                  Authorization: `Bearer ${userToken}`
                }
              })
             if(result.status === 200){
                window.alert(result.data.message)
             }else{
                window.alert("There is a problem in Removing task, Try again later")
                console.log(result.data.message)
             }   
           
        }catch(err){
            window.alert("There is a problem in Removing task, Try again later")
            console.log(err)
        }
    }

    const handleMarkDone = async(e) => {
        dispatch({
            type: "MARK_DONE",
            id
        })

        var completed = e.target.checked

        try{
            const res = await axios.post('/task/markTaskCompleted',{"id":task._id,"completed":completed},{
                headers: {
                  Authorization: `Bearer ${userToken}`
                }
              })
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                <h4 className="task-title text-lg capitalize">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <div className=' italic opacity-60'>
                    {
                        task?.createdAt ? (
                            <p>{moment(task.createdAt).fromNow()}</p>
                        ) : (
                            <p>just now</p>
                        )
                    }
                </div>
            </div>
            <div className="remove-task text-sm text-white">
                <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    size="large"
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
            </div>
        </div>
    );
}

export default Task;