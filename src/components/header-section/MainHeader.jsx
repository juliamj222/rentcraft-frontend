import logo from "../../assets/RentCraftLogocropped.png";
import "./MainHeader.css";

const MainHeader = (props) => {
  return (
    <header>
      <div className="d-flex justify-content-center  quarternary-background">
        <img src={logo} alt="logo" className="App-logo" />
      </div>
    </header>
  );
};

export default MainHeader;
