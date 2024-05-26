
import { Routes,Route } from 'react-router-dom'
import RegisterEmployee from '../src/component/RegisterEmployee'
import Employeetable from '../src/component/Employeetable'
import './App.css'


function App() {
 

  return (
    <>
      <Routes>
        <Route path='/' element={<RegisterEmployee/>}> </Route>
        <Route path='/allEmp' element={<Employeetable/>}> </Route>
        <Route path='/editEmployee/:id' element={<RegisterEmployee/>}> </Route>
      </Routes>
    </>
  )
}

export default App
