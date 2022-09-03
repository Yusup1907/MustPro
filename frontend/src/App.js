import './App.css';
import Header from './component/Home/Header';
import Navbar from './component/Home/Navbar';
import PropertiList from './component/Properti/propertiList';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Header />

    <div>
      <PropertiList />
    </div>
    </div>
  );
}

export default App;
