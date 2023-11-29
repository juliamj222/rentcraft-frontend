import logo from "../../assets/RentCraftLogocropped.png";
import "./MainHeader.css";

const MainHeader = (props) => {

    return ( 
    <>
    <header className="d-flex justify-content-flex-end align-items-flex-start quarternary-background">
        <div className="d-flex justify-content-center margin-right margin-top">
          <img src={logo} alt="logo" className="App-logo" /> 
        </div>
        </header>
    </> 
    );
}
 
export default MainHeader;
