import Footer from './Components/Footer';
import Header from './Components/Header';

<html>
<body>
  <Header/>

  <main id="languages" class="page">
    <h2 style="text-align: center; margin-top: 20px;">Select a Language</h2>
    <div class="search-container">
      <input type="text" id="searchInput" placeholder="Search languages..." onkeyup="filterLanguages()"></input>
    </div>
    <div class="languages-grid" id="languageGrid"></div>
  </main>

  <div id="languageModal" class="modal">
    <div class="modal-content">
      <span class="close" onclick="closeModal()">&times;</span>
      <div id="modalBody"></div>
    </div>
  </div>
  
  <Footer/>
  
</body>
</html>