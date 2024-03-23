import './App.css';
import MyButton from './component/MyButton'
import logo from './component/image.png'; // Import your logo image file
import OpenCloseComponent from './component/adminshow'
import SetData from './component/insertdata'
function App() {
  return (
    <div className="App">
      <div className="container">
        <header>
          <img className="logo" src={logo} alt="Logo" />
        </header>
        <div className="content">
          <h1 className="header-text">สมัครอนุสโมสร </h1>
          <h2 className="header-text">คณะศิลปศาสตร์และวิทยาศาสตร์</h2><br></br>
          <div className="container">
            <h3 className="animated-text">สร้างผลงานเก็บเกี่ยวประสบการกับสโมสร</h3>
          </div>
          <MyButton/>
          <OpenCloseComponent/>
        </div>
      </div>
    </div>
  );
}

export default App;
