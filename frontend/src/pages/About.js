
import '../assets/about.css';
import reem from '../picture/reem.jpg';

const About = () => {
    return (  
        <div className="App">
            
                <main id="about" className="page">
                    <div className="about">
                    <img src={reem} alt="about icon"/>
                    <h2>Welcome to Language Learning Buddy</h2>
                    <p>
                        Our mission is to make learning languages easy, fun, and accessible for everyone.
                    </p>

                    <ul>
                        <li>📘 Provide simple and clear lessons.</li>
                        <li>🌍 Help students connect with new cultures.</li>
                        <li>⚡ Improve vocabulary and communication skills.</li>
                        <li>🤝 Create a supportive learning community.</li>
                    </ul>
                    </div>
                </main>
        </div>
    );
}
 
export default About;