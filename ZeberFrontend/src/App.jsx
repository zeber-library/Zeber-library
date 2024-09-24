import { BrowserRouter, Routes, Route} from "react-router-dom";
import ContactPage from "./AllFolders/ContactPage/ContactPage";
import Music from "./AllFolders/Music/Music";
import Book from "./AllFolders/Book/Book";
import Video from "./AllFolders/Video/Video";
import AudioBookPlayer from "./AllFolders/AudioBookPlayer/AudioBookPlayer";
import Reel from "./AllFolders/Reel/Reel";
import Library from "./AllFolders/Library/Library";
import UploadForm from "./AllFolders/UploadBook/Form/UploadForm";
import LibraryProfilePage from '../src/AllFolders/MyProfilePage/LibraryProfilePage';
import BuySellRoutes from "./AllFolders/buy-sell/BuySellRoutes";



function App() {
  return (
    <BrowserRouter>    
      <Routes>
        {/* Library home page */}
        <Route path="/" element={<Library />} />

        {/* Book page */}
        <Route path="/book" element={<Book />} />

        {/* Video page */}
        <Route path="/video" element={<Video />} />

        {/* AudioBookPlayer page */}
        <Route path="/audio-book" element={<AudioBookPlayer />} />

        {/* Music Page */}
        <Route path="/music" element={<Music />} />


       {/* Reel page */}
        <Route path="/reels" element={<Reel/>}/>

        {/* Form page for uploading the book */}
        <Route path="/upload-book" element={<UploadForm />} />


        {/* Contact-us page */}
        <Route path="/contact-us" element={<ContactPage />} />


        {/* Book Sell Page */}

        <Route path="/*" element={<BuySellRoutes/>}/>

        {/* My Library Profile */}
        <Route path="/library-profile/*" element={ <LibraryProfilePage/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
