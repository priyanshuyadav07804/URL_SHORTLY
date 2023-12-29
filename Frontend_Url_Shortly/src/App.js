import { useSelector } from 'react-redux';
import './App.css';
import Search from './components/Search';
import ShortUrl from './components/ShortUrl';

function App() {
  const {clickSearch} = useSelector((store)=>store.click)

  return (
    <div className="App">
        <Search/>
        { clickSearch && <ShortUrl/>}
    </div>
  );
}

export default App;
