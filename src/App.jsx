import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './components/about';
import Landing from './components/landing.jsx';
import Error from './components/error';
import PlanetDetails from './components/planetDetails';
import Stars from './components/stars.jsx';
import Exoplanets from './components/exoplanets.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/aboutUs" element={<About/>} />
        <Route path="/planet-details" element={<PlanetDetails/>} />
        <Route path="/stars" element={<Stars/>} />
        <Route path="/exoplanets" element={<Exoplanets/>} />
        <Route
          path="*"
          element={
            <>
              <Error/>
              <Navigate to="/not-found" replace/>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;