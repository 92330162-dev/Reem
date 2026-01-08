import { Link } from "react-router-dom";
import '../assets/index.css';

const Home = () => {
    return ( 
        <div className="App">
          
          <main id="home" className="page">
            <section class="welcome">
              <h1>Welcome to Language Learning Buddy</h1>
              <p>Your companion for learning new languages easily and interactively.</p>
              <p>Explore over 100 languages from around the world!</p>
              <Link className="btn" to="/languages"> Explore Languages </Link>
            </section>
          </main>
        
        </div>
     );
}
 
export default Home;