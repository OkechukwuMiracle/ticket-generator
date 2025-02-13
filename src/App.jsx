import {Routes, Route} from "react-router-dom"
import HomePage from './components/HomePage/selectTicket'
import AttendeeDetails from './components/HomePage/attendeeDetails'
import Ready from "./components/HomePage/ready"


const App = () => {
  return(
    <div>
      <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/attendeeDetails" element={<AttendeeDetails />} />
      <Route exact path="/ready" element={<Ready />} />
      </Routes>
    </div>
  )
}

export default App