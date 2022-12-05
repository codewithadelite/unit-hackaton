import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const Manufactures = () => {
    const URL = "http://127.0.0.1:8000/api";
    const [manufactures, setManufactures] =  useState([]);

    const fetchManufactures = () => {
        axios.get(`${URL}/manufactures/`)
        .then(res => {
            setManufactures(res.data);
        })
        .catch(error => {
            console.log(error);
        })
    };

    const deleteManufacture = id => {
        axios.delete(`${URL}/manufactures/${id}`)
        .then(res => {
            if(res.data.result === "success"){
                let newManufacture = [...manufactures];
                let index = newManufacture.findIndex((obj) => obj.id === id);
                
                if(index !== -1){
                    newManufacture.splice(index, 1);
                    setManufactures(newManufacture);
                    alerting("Success", "success", "Manufacture deleted successfully.")
                }
            } 
        })
        .catch(error => {
            console.log(error);
        })  
    };

    const alerting = (title, icon, message) => {
        Swal.fire({
            title: title,
            text: message,
            icon: icon,
            confirmButtonText: 'Cool'
          })
    }
    useEffect(() => {
        fetchManufactures();
    },[]);
  return (
    <div>
        <div className='container mt-3'>
            <h4 className='bold-500'>
                Manufactures
            </h4>
            <table className='table table-hover table-bordered table-collapse'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {manufactures.map((item, index) => 
                        <tr>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>
                                <button className='btn btn-primary btn-sm bg-prim border-0'>
                                    <i className='fa fa-edit'></i>
                                </button> &nbsp;
                                <button 
                                    className='btn btn-danger btn-sm  border-0' 
                                    onClick={() => deleteManufacture(item.id)}
                                >
                                    <i className='fa fa-trash'></i>
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Manufactures