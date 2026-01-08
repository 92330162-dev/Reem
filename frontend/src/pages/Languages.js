import '../assets/language.css';
import { useState } from "react";

const initialLanguagesData = [
   
    { name: "English",flag: "🇬🇧",info: "English is the most widely spoken language worldwide, used in international business, science, and technology. It's the official language in over 50 countries.",speakers: "1.5 billion"},
    { name: "Mandarin Chinese",flag: "🇨🇳",info: "Mandarin is the most spoken native language in the world. It's a tonal language with thousands of characters.", speakers: "1.1 billion" },
    { name: "Hindi",flag: "🇮🇳",info: "Hindi is one of the official languages of India and is written in the Devanagari script.",speakers: "600 million"},
    { name: "Spanish", flag: "🇪🇸", info: "Spanish is the second most spoken native language. It is rich in literature, music, and traditions from Spain and Latin America.", speakers: "560 million" },
    { name: "French", flag: "🇫🇷", info: "French is spoken in more than 29 countries. It is known as the language of diplomacy, art, and culture.", speakers: "280 million" },
    { name: "Arabic", flag: "🇸🇦", info: "Arabic is the liturgical language of Islam and is spoken across the Middle East and North Africa.", speakers: "310 million" },
    { name: "Bengali", flag: "🇧🇩", info: "Bengali is the official language of Bangladesh and the second most spoken language in India.", speakers: "265 million" },
    { name: "Russian", flag: "🇷🇺", info: "Russian is the most widespread language in Eurasia and the official language of Russia.", speakers: "258 million" },
    { name: "Portuguese", flag: "🇵🇹", info: "Portuguese is the official language of Portugal, Brazil, and several African nations.", speakers: "234 million" },
    { name: "Urdu", flag: "🇵🇰", info: "Urdu is the national language of Pakistan and is closely related to Hindi.", speakers: "230 million" },
    { name: "Indonesian", flag: "🇮🇩", info: "Indonesian is the official language of Indonesia, the world's fourth most populous country.", speakers: "199 million" },
    { name: "German", flag: "🇩🇪", info: "German is the most widely spoken language in the European Union and is known for its compound words.", speakers: "134 million" },
    { name: "Japanese", flag: "🇯🇵", info: "Japanese uses three writing systems: Hiragana, Katakana, and Kanji. It's the language of anime and technology.", speakers: "125 million" },
    { name: "Swahili", flag: "🇰🇪", info: "Swahili is a lingua franca in East Africa and is one of the official languages of the African Union.", speakers: "200 million" },
    { name: "Marathi", flag: "🇮🇳", info: "Marathi is an Indo-Aryan language spoken predominantly in the Indian state of Maharashtra.", speakers: "83 million" },
    { name: "Telugu", flag: "🇮🇳", info: "Telugu is a Dravidian language spoken in southern India, particularly in Andhra Pradesh.", speakers: "95 million" },
    { name: "Turkish", flag: "🇹🇷", info: "Turkish is the official language of Turkey and is spoken by communities across Europe and Central Asia.", speakers: "88 million" },
    { name: "Tamil", flag: "🇮🇳", info: "Tamil is one of the oldest languages still in use, with a rich literary tradition spanning over 2,000 years.", speakers: "81 million" },
    { name: "Vietnamese", flag: "🇻🇳", info: "Vietnamese is a tonal language written in the Latin alphabet and is the official language of Vietnam.", speakers: "85 million" },
    { name: "Korean", flag: "🇰🇷", info: "Korean uses the Hangul alphabet, considered one of the most scientific writing systems in the world.", speakers: "82 million" },
    { name: "Italian", flag: "🇮🇹", info: "Italian is the language of art, music, and cuisine, with deep roots in Roman culture.", speakers: "67 million" },
    { name: "Polish", flag: "🇵🇱", info: "Polish is a West Slavic language with complex grammar and is spoken primarily in Poland.", speakers: "45 million" },
    { name: "Ukrainian", flag: "🇺🇦", info: "Ukrainian is an East Slavic language and the official language of Ukraine.", speakers: "41 million" },
    { name: "Dutch", flag: "🇳🇱", info: "Dutch is spoken in the Netherlands and Belgium and is closely related to German and English.", speakers: "25 million" },
    { name: "Greek", flag: "🇬🇷", info: "Greek has one of the longest documented histories of any language, dating back 3,400 years.", speakers: "13 million" },
    { name: "Thai", flag: "🇹🇭", info: "Thai is a tonal language written in its own unique script and is the official language of Thailand.", speakers: "69 million" },
    { name: "Persian (Farsi)", flag: "🇮🇷", info: "Persian is the official language of Iran and has influenced many languages across Central and South Asia.", speakers: "110 million" },
    { name: "Romanian", flag: "🇷🇴", info: "Romanian is a Romance language with Slavic influences, spoken primarily in Romania and Moldova.", speakers: "24 million" },
    { name: "Czech", flag: "🇨🇿", info: "Czech is a West Slavic language spoken in the Czech Republic with a rich literary tradition.", speakers: "10 million" },
    { name: "Swedish", flag: "🇸🇪", info: "Swedish is a North Germanic language spoken in Sweden and parts of Finland.", speakers: "13 million" },
    { name: "Hungarian", flag: "🇭🇺", info: "Hungarian is a Uralic language unrelated to most European languages, known for its complex grammar.", speakers: "13 million" },
    { name: "Hebrew", flag: "🇮🇱", info: "Hebrew was revived as a spoken language in the 19th century and is now the official language of Israel.", speakers: "9 million" },
    { name: "Malay", flag: "🇲🇾", info: "Malay is spoken in Malaysia, Singapore, and Brunei, and is closely related to Indonesian.", speakers: "290 million" },
    { name: "Tagalog", flag: "🇵🇭", info: "Tagalog is the basis of Filipino, the national language of the Philippines.", speakers: "45 million" },
    { name: "Kannada", flag: "🇮🇳", info: "Kannada is a Dravidian language spoken in the state of Karnataka in southern India.", speakers: "44 million" },
    { name: "Gujarati", flag: "🇮🇳", info: "Gujarati is an Indo-Aryan language spoken in the Indian state of Gujarat.", speakers: "56 million" },
    { name: "Punjabi", flag: "🇮🇳", info: "Punjabi is spoken in the Punjab region of India and Pakistan and has a rich cultural heritage.", speakers: "125 million" },
    { name: "Norwegian", flag: "🇳🇴", info: "Norwegian has two written forms: Bokmål and Nynorsk, and is spoken in Norway.", speakers: "5 million" },
    { name: "Danish", flag: "🇩🇰", info: "Danish is a North Germanic language spoken in Denmark and is known for its unique pronunciation.", speakers: "6 million" },
    { name: "Finnish", flag: "🇫🇮", info: "Finnish is a Uralic language known for its complex case system and long compound words.", speakers: "5 million" },
    { name: "Slovak", flag: "🇸🇰", info: "Slovak is a West Slavic language closely related to Czech and spoken in Slovakia.", speakers: "5 million" },
    { name: "Croatian", flag: "🇭🇷", info: "Croatian is a South Slavic language spoken in Croatia and neighboring countries.", speakers: "6 million" },
    { name: "Serbian", flag: "🇷🇸", info: "Serbian can be written in both Cyrillic and Latin scripts and is spoken in Serbia.", speakers: "12 million" },
    { name: "Bulgarian", flag: "🇧🇬", info: "Bulgarian is a South Slavic language using the Cyrillic alphabet.", speakers: "8 million" },
    { name: "Lithuanian", flag: "🇱🇹", info: "Lithuanian is one of the oldest living Indo-European languages with many archaic features.", speakers: "3 million" },
    { name: "Latvian", flag: "🇱🇻", info: "Latvian is a Baltic language spoken in Latvia and is related to Lithuanian.", speakers: "2 million" },
    { name: "Estonian", flag: "🇪🇪", info: "Estonian is a Uralic language closely related to Finnish and spoken in Estonia.", speakers: "1 million" },
    { name: "Slovenian", flag: "🇸🇮", info: "Slovenian is a South Slavic language with dual grammatical number, spoken in Slovenia.", speakers: "2 million" },
    { name: "Catalan", flag: "🏴", info: "Catalan is a Romance language spoken in Catalonia, Valencia, and the Balearic Islands.", speakers: "10 million" },
    { name: "Basque", flag: "🏴", info: "Basque is a language isolate with no known relatives, spoken in the Basque Country.", speakers: "750,000" },
    { name: "Welsh", flag: "🏴", info: "Welsh is a Celtic language spoken in Wales with a revitalization movement.", speakers: "750,000" },
    { name: "Irish", flag: "🇮🇪", info: "Irish (Gaelic) is the first official language of Ireland with ancient Celtic roots.", speakers: "1.8 million" },
    { name: "Icelandic", flag: "🇮🇸", info: "Icelandic has remained relatively unchanged since medieval times and is spoken in Iceland.", speakers: "350,000" },
    { name: "Albanian", flag: "🇦🇱", info: "Albanian is an Indo-European language spoken in Albania and Kosovo.", speakers: "7.6 million" },
    { name: "Macedonian", flag: "🇲🇰", info: "Macedonian is a South Slavic language spoken in North Macedonia.", speakers: "2 million" },
    { name: "Maltese", flag: "🇲🇹", info: "Maltese is the only Semitic language written in Latin script and is spoken in Malta.", speakers: "520,000" },
    { name: "Armenian", flag: "🇦🇲", info: "Armenian has its own unique alphabet and is one of the oldest written languages.", speakers: "7 million" },
    { name: "Georgian", flag: "🇬🇪", info: "Georgian has a unique script and is the official language of Georgia.", speakers: "4 million" },
    { name: "Mongolian", flag: "🇲🇳", info: "Mongolian uses both Cyrillic and traditional Mongolian scripts.", speakers: "5 million" },
    { name: "Nepali", flag: "🇳🇵", info: "Nepali is the official language of Nepal and is written in Devanagari script.", speakers: "16 million" },
    { name: "Sinhala", flag: "🇱🇰", info: "Sinhala is spoken in Sri Lanka and has its own unique script.", speakers: "17 million" },
    { name: "Burmese", flag: "🇲🇲", info: "Burmese is the official language of Myanmar with a circular script.", speakers: "33 million" },
    { name: "Khmer", flag: "🇰🇭", info: "Khmer is the official language of Cambodia with a beautiful script.", speakers: "16 million" },
    { name: "Lao", flag: "🇱🇦", info: "Lao is the official language of Laos and is tonal like Thai.", speakers: "30 million" },
    { name: "Amharic", flag: "🇪🇹", info: "Amharic is the official language of Ethiopia and uses the Ge'ez script.", speakers: "57 million" },
    { name: "Somali", flag: "🇸🇴", info: "Somali is a Cushitic language spoken in Somalia and neighboring regions.", speakers: "16 million" },
    { name: "Hausa", flag: "🇳🇬", info: "Hausa is widely spoken across West Africa and is used as a lingua franca.", speakers: "77 million" },
    { name: "Yoruba", flag: "🇳🇬", info: "Yoruba is spoken in Nigeria and Benin with a rich oral and written tradition.", speakers: "45 million" },
    { name: "Igbo", flag: "🇳🇬", info: "Igbo is spoken in southeastern Nigeria with various dialects.", speakers: "27 million" },
    { name: "Zulu", flag: "🇿🇦", info: "Zulu is the most widely spoken language in South Africa with click consonants.", speakers: "12 million" },
    { name: "Xhosa", flag: "🇿🇦", info: "Xhosa is known for its click consonants and is spoken in South Africa.", speakers: "8 million" },
    { name: "Afrikaans", flag: "🇿🇦", info: "Afrikaans evolved from Dutch and is spoken in South Africa and Namibia.", speakers: "7 million" },
    { name: "Malagasy", flag: "🇲🇬", info: "Malagasy is spoken in Madagascar and is related to Indonesian languages.", speakers: "18 million" },
    { name: "Quechua", flag: "🇵🇪", info: "Quechua was the language of the Inca Empire and is still spoken in the Andes.", speakers: "8 million" },
    { name: "Guarani", flag: "🇵🇾", info: "Guarani is an official language of Paraguay and widely spoken there.", speakers: "6.5 million" },
    { name: "Aymara", flag: "🇧🇴", info: "Aymara is spoken in the Andes region, particularly in Bolivia and Peru.", speakers: "2 million" },
    { name: "Nahuatl", flag: "🇲🇽", info: "Nahuatl was the language of the Aztecs and is still spoken in Mexico.", speakers: "1.7 million" },
    { name: "Maya", flag: "🇬🇹", info: "Maya languages are spoken in Mexico and Central America with ancient roots.", speakers: "6 million" },
    { name: "Hmong", flag: "🏴", info: "Hmong is spoken by the Hmong people across Southeast Asia and diaspora communities.", speakers: "4 million" },
    { name: "Tibetan", flag: "🏴", info: "Tibetan is spoken in Tibet and has a rich Buddhist literary tradition.", speakers: "6 million" },
    { name: "Uyghur", flag: "🏴", info: "Uyghur is a Turkic language spoken in Xinjiang, China.", speakers: "10 million" },
    { name: "Kazakh", flag: "🇰🇿", info: "Kazakh is a Turkic language and the official language of Kazakhstan.", speakers: "13 million" },
    { name: "Uzbek", flag: "🇺🇿", info: "Uzbek is a Turkic language spoken in Uzbekistan and neighboring countries.", speakers: "34 million" },
    { name: "Tajik", flag: "🇹🇯", info: "Tajik is a variety of Persian spoken in Tajikistan using Cyrillic script.", speakers: "8 million" },
    { name: "Turkmen", flag: "🇹🇲", info: "Turkmen is a Turkic language spoken in Turkmenistan.", speakers: "7 million" },
    { name: "Kyrgyz", flag: "🇰🇬", info: "Kyrgyz is a Turkic language and the official language of Kyrgyzstan.", speakers: "4 million" },
    { name: "Azerbaijani", flag: "🇦🇿", info: "Azerbaijani is a Turkic language spoken in Azerbaijan and Iran.", speakers: "33 million" },
    { name: "Pashto", flag: "🇦🇫", info: "Pashto is one of the official languages of Afghanistan.", speakers: "60 million" },
    { name: "Dari", flag: "🇦🇫", info: "Dari is a variety of Persian and an official language of Afghanistan.", speakers: "25 million" },
    { name: "Kurdish", flag: "🏴", info: "Kurdish is spoken by the Kurdish people across Turkey, Iraq, Iran, and Syria.", speakers: "30 million" },
    { name: "Bosnian", flag: "🇧🇦", info: "Bosnian is a South Slavic language spoken in Bosnia and Herzegovina.", speakers: "2.5 million" },
    { name: "Luxembourgish", flag: "🇱🇺", info: "Luxembourgish is a Germanic language and the national language of Luxembourg.", speakers: "400,000" },
    { name: "Faroese", flag: "🇫🇴", info: "Faroese is a North Germanic language spoken in the Faroe Islands.", speakers: "70,000" },
    { name: "Greenlandic", flag: "🇬🇱", info: "Greenlandic is an Eskimo-Aleut language spoken in Greenland.", speakers: "57,000" },
    { name: "Samoan", flag: "🇼🇸", info: "Samoan is a Polynesian language spoken in Samoa and American Samoa.", speakers: "510,000" },
    { name: "Tongan", flag: "🇹🇴", info: "Tongan is a Polynesian language spoken in Tonga.", speakers: "187,000" },
    { name: "Fijian", flag: "🇫🇯", info: "Fijian is an Austronesian language spoken in Fiji.", speakers: "350,000" },
    { name: "Hawaiian", flag: "🏴", info: "Hawaiian is a Polynesian language undergoing revitalization in Hawaii.", speakers: "24,000" },
    { name: "Maori", flag: "🇳🇿", info: "Maori is the language of the indigenous people of New Zealand.", speakers: "150,000" },
    { name: "Yiddish", flag: "🏴", info: "Yiddish is a Germanic language historically spoken by Ashkenazi Jews.", speakers: "1.5 million" },
    { name: "Esperanto", flag: "🏴", info: "Esperanto is a constructed international auxiliary language created in 1887.", speakers: "2 million" },
    { name: "Latin", flag: "🏛", info: "Latin is an ancient language that influenced many modern European languages.", speakers: "Historical" },
    { name: "Sanskrit", flag: "🕉", info: "Sanskrit is an ancient Indo-Aryan language and the liturgical language of Hinduism.", speakers: "Historical" }

]; 

export default function Languages() {
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState(null);

  const filtered = initialLanguagesData.filter(lang =>
    lang.name.toLowerCase().includes(search.toLowerCase())
  );

  return ( 
    <div className="App">
    

      <main id="languages" className="page">
        <h2>Select a Language</h2>

        <div className="search-container">
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Search languages..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="languages-grid">
          {filtered.map((lang, i) => (
            <div key={i} className="lang-card" onClick={() => setSelectedLang(lang)}>
              <div className="flag">{lang.flag}</div>
              <p>{lang.name}</p>
            </div>
          ))}
        </div>
      </main>
      
      {selectedLang && (
        <div className="modal active" onClick={() => setSelectedLang(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedLang(null)}>&times;</span>
            <h3>{selectedLang.flag} {selectedLang.name}</h3>
            <p>{selectedLang.info}</p>
            <p><strong>Speakers:</strong> {selectedLang.speakers}</p>
          </div>
        </div>
      )}
    </div>
  );
}
