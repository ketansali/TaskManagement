
import './App.css';
import Header from './components/Header';
import SuperAdmin from './components/sidebar/SuperAdmin';
import Country from './pages/Master/Country';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';



function App() {
  
  return (
    <>
      <Header/>
      <SuperAdmin/>
      <Country/>
    
     <ToastContainer/>
     
    </>
  );
}

export default App;
