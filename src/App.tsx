import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Explore from './Pages/Explore';
import MyCollection from "./Pages/MyCollection";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/explore' element={<Explore/>} />
        <Route path='/collection' element={<MyCollection/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
