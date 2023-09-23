import './App.css';
import Body from './Components/Body';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Body/>
        <Footer/>
      </header>
    </div>
  );
}

export default App;
