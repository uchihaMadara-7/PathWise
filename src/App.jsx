import './Styles/App.css';
import Navbar from './UI Components/Navbar';
import * as Graph from './Components/Graph';
import { useEffect} from 'react';

const App = () => {

  /*
    useEffect() works as ComponentDidMount() i.e. it will work the first time
    app is rendered. So this is a good place to initialise state
  */
  useEffect(()=> {

  }, []);

  return (
    <div>
      <Navbar />
    </div >
  );
}

export default App;
