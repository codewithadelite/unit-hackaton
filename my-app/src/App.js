import './App.css';
import Navigation from './components/Navigation';
import Statistics from './components/Statistics';
import Inventory from './components/Inventory';
import Manufactures from './components/Manufactures';
import InventoryDat from './components/InventoryDat'

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Statistics />} />
        <Route path="/inventories/:kod" element={<Inventory />} />
        <Route path="/inventories/products/:invId" element={<InventoryDat />} />   
        <Route path="/manufactures" element={<Manufactures/>} />
      </Routes>
    </Router>
  );
}

export default App;
