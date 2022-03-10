import './App.scss';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MovieDetail from './components/MovieDetail/MovieDetail';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieListing from './components/MovieListing/MovieListing';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='container'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/movies' element={<MovieListing />} />
          <Route exact path='/movie/:imdbId' element={<MovieDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
