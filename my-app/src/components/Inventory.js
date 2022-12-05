import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Inventory = () => {
  const params = useParams();
  
  const URL = "https://inventura.flexibee.eu/v2/c";
  const COMPANY = "firma6";
  const Token = btoa("admin6:admin6admin6");

  const [inventory, setInventory] = useState([]);
  const [type, setType] = useState("");


  let config = {
    headers: {
      "Authorization": `Basic ${Token}`,
      "Accept": "application/json",
      "Content-Type":"application/json"
    }
  }

  const addInventory = () => {
    let date = new Date().toISOString().substring(0,10);
    let data = {
        winstrom:{
            inventura: [
                {
                    typInventury: type,
                    datZahaj: date,
                    sklad: `code:${params.kod}`,
                    stavK: "stavInventury.zahajena"
                },
            ]
        }
    }
    let jsonPayload = JSON.stringify(data);

    axios.post(`${URL}/${COMPANY}/inventura/`, jsonPayload, config
    )
    .then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        console.log(error)
    });

  };

  useEffect(()=> {
    axios.get(`${URL}/${COMPANY}/inventura/(sklad="code:${params.kod}")?detail=full`,config
    )
    .then((res) => {
        setInventory(res.data.winstrom.inventura);
    })
    .catch((error) => {
        console.log(error)
    });
  },[]);

  return (
    <div>
        <div className='container mt-5'>
            <div className='d-flex align-items-center justify-content-between'>
                <h3>
                    Inventories
                </h3>
                <button className='btn btn-primary btn-sm bg-prim border-0' data-toggle="modal" data-target="#inventoryModal">
                    Create Inventory
                </button>
            </div>
            <div className='row'>
            {inventory.map((item,index) => 
                <div className='col-md-3 mt-4'>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='card-body'>
                                <h6>
                                    typInventury:
                                </h6>
                                <span>{item.typInventury}</span>
                                <h6>
                                    datKonec:
                                </h6>
                                <span>{item.datKonec}</span>
                            </div>
                            <div className='card-footer'>
                                  <Link to={`/inventories/products/${item.id}?warehouseId=${item.sklad}`}>
                                    <button className='btn btn-primary btn-sm bg-prim border-0'>
                                        View Inventory Products
                                    </button>  
                                  </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>

        <div className="modal fade" id="inventoryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Přidat inventuru</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <form>
                    <div className="form-group">
                        <label >Typ Inventury</label>
                        <input type="text" className="form-control" value={type} onChange={(e) => setType(e.target.value)}/>
                    </div>
                </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={addInventory}>Přidat</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Inventory