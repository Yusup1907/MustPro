import "./Navbar.css"

import logo from "../Assets/MustPro.png"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <img className="logo" src={logo} alt="logo"/>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar