import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Statistics = () => {
  const URL = "https://inventura.flexibee.eu/v2/c";
  const COMPANY = "firma6";
  const Token = btoa("admin6:admin6admin6")
  const [warehouse, setWarehouse] = useState([]);
  let config = {
    headers: {
      Authorization: `Basic ${Token}`,
      Accept: "application/json",
    }
  }

  useEffect(()=> {
    axios.get(`${URL}/${COMPANY}/sklad?detail=full`,config
    )
    .then((res) => {
        setWarehouse(res.data.winstrom.sklad);
    })
    .catch((error) => {
        console.log(error)
    });
  },[]);
  return (
    <div>
        <div className='container mt-5'>
            <h3>
                Warehouses
            </h3>
            <div className='row'>
            {warehouse.map((item,index) => 
                <div className='col-md-3 mt-4'>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='card-body'>
                                <h6>
                                    Kod:
                                </h6>
                                <span>{item.kod}</span>
                                <h6>
                                    Nazev:
                                </h6>
                                <span>{item.nazev}</span>
                            </div>
                            <div className='card-footer'>
                                <Link to={`inventories/${item.kod}`}>
                                  <button className='btn btn-primary btn-sm bg-prim border-0'>
                                    View Inventories
                                    </button>  
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    </div>
  )
}

export default Statistics