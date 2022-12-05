import React from 'react'
import {Link} from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-prim">
            <div className='container'>
                <a class="navbar-brand text-white" href="#">INVENTORY</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                    <Link to="/" class="nav-link text-white">View Warehouses</Link>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Actions
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navigation