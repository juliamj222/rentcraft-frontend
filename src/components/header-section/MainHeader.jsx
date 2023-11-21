import logo from  "../../assets/RentCraftLogocropped.png"; 
import "./MainHeader.css";

const MainHeader = (props) => {
    return ( 
    <>
    <header className="d-flex justify-content-center align-items-center quarternary-background">
        <div className="d-flex justify-content-center align-items-center tertiary-background">
          <img src={logo} alt="logo" className="App-logo" /> 
        </div>
        </header>
    </> 
    );
}
 
export default MainHeader;