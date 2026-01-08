import {Link} from 'react-router-dom';
import './NavBar.css';
const NavBar = () => {
  return (
    <div className="navbar">
     
        
        <div className="hiddenLinks">
          <Link to="/"> Home </Link>
          <Link to="/languages"> Languages </Link>
          <Link to="/register"> Register </Link>
          <Link to="/language-management"> Language-management </Link>
          <Link to="/about"> About </Link>
          
        </div>
      
      <div className="rightSide">
        <Link to="/"> Home </Link>
        <Link to="/languages"> Languages </Link>
        <Link to="/register"> Register </Link>
        <Link to="/language-management"> Language-management </Link>
        <Link to="/about"> About </Link>
        
      </div>
    </div>
  )
}

export default NavBar;