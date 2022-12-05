import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Inventory = () => {
  const params = useParams();
  const [queryParams] = useSearchParams()

  const URL = "https://inventura.flexibee.eu/v2/c";
  const COMPANY = "firma6";
  const Token = btoa("admin6:admin6admin6");

  const [products, setProducts] = useState([]);
  const [code, setCode] = useState("");
  const [update, setUpdate] = useState(false);

  const [amount, setAmount] = useState(1);
  const ucetniObdobi = "2022";
  const WAREHOUSE_ID = queryParams.get("warehouseId");



  let config = {
    headers: {
      "Authorization": `Basic ${Token}`,
      "Accept": "application/json",
      "Content-Type":"application/json"
    }
  }

  const toast = (icon, message) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: icon,
        title: message
      })
  }
  const addProduct = () => {
    axios.get(`${URL}/${COMPANY}/skladova-karta/(sklad="${WAREHOUSE_ID}" and ucetObdobi="code:${ucetniObdobi}" and cenik="ean:${code}")?detail=summary`,config
    )
    .then((res) => {
        console.log(res.data.winstrom["skladova-karta"]);
        if(res.data.winstrom["skladova-karta"].length === 0){
           toast("error", "Product not exist in warehouse");
        }else{
            axios.get(`${URL}/${COMPANY}/inventura-polozka/(inventura=${params.invId} and cenik="${res.data.winstrom["skladova-karta"][0]["cenik"]}")?detail=full`,config
            )
            .then((result) => {
                console.log(result.data);
                let productData  = {
                    "winstrom": {
                      "inventura-polozka": [
                        {
                          "inventura": params.invId,
                          "sklad": WAREHOUSE_ID,
                          "cenik": `${res.data.winstrom["skladova-karta"][0]["cenik"]}`,
                          "mnozMjReal": amount
                        }]
                      }
                  }
                if(result.data.winstrom["inventura-polozka"].length === 0){
                    axios.post(`${URL}/${COMPANY}/inventura-polozka/`, JSON.stringify(productData),config
                    )
                    .then((res) => {
                        setUpdate(!update);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                }else{
                    productData.winstrom["inventura-polozka"][0]["id"] = result.data.winstrom["inventura-polozka"][0].id;
                    axios.put(`${URL}/${COMPANY}/inventura-polozka/`, JSON.stringify(productData),config
                    )
                    .then((res) => {

                        setUpdate(!update);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
                }
            })
            .catch((error) => {
                console.log(error)
            });
        }
    })
    .catch((error) => {
        console.log(error)
    });
  };

  useEffect(()=> {
    axios.get(`${URL}/${COMPANY}/inventura-polozka/(inventura=${params.invId})?detail=full`,config
    )
    .then((res) => {

        setProducts(res.data.winstrom["inventura-polozka"]);
    })
    .catch((error) => {
        console.log(error)
    });
  },[update]);

  return (
    <div>
        <div className='container mt-5'>
            <div className='row mb-2'>
                <div className='col-md-3'>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='card-body'>
                                <form>
                                    <div className="form-group">
                                        <label >Počet</label>
                                        <input type="text" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                                        <label >EAN</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={code} 
                                            onChange={(e) => setCode(e.target.value) }
                                            onKeyPress={event => {
                                                if (event.key === 'Enter') {
                                                  addProduct()
                                                }
                                              }} />
                                    </div>
                                </form>
                            </div>
                            <div className='card-footer'>
                                <button className='btn btn-primary'>
                                    Přidat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3>
                    Products
                </h3>
            </div>
            <div className='row'>
            {products.map((item,index) => 
                <div className='col-md-3 mt-4'>
                    <div className='card'>
                        <div className='card-content'>
                            <div className='card-body'>
                            <h6>Kód/zkratka</h6>
                            <span>{item.cenik}</span>
                            <h6>Název</h6>
                            <span>{item["cenik@showAs"].split(":").slice(1,).join(":").trim()}</span>
                            <h6>Očekávané množství</h6>
                            <span>{item.mnozMjKarta}</span>
                            <h6>Reálné množství</h6>
                            <span>{item.mnozMjReal}</span>                            
                                
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

export default Inventory