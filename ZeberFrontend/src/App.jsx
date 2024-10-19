import { BrowserRouter, Routes, Route} from "react-router-dom";
import ContactPage from "./AllFolders/ContactPage/ContactPage";
import Music from "./AllFolders/Music/Music";
import Book from "./AllFolders/Book/Book";
import Video from "./AllFolders/Video/Video";
import AudioBookPlayer from "./AllFolders/AudioBookPlayer/AudioBookPlayer";
import Reel from "./AllFolders/Reel/Reel";
import ReelUpload from "./AllFolders/Reel/ReelUpload";
import Library from "./AllFolders/Library/Library";
import UploadForm from "./AllFolders/UploadBook/Form/UploadForm";
import LibraryProfilePage from '../src/AllFolders/MyProfilePage/LibraryProfilePage';
//import BuySellRoutes from "./AllFolders/buy-sell/BuySellRoutes";
import HomeScreen from "./AllFolders/buy-sell/components/HomeScreen";
import BookSearch from "./AllFolders/Library/Components/BookSearch";

function App() {
  return (
    <BrowserRouter>    
      <Routes>
        {/* Library home page */}
        <Route path="/" element={<Library />} />

        {/* Book page */}
        <Route path="/book" element={<Book />} />
         {/* Book search */}
         <Route path="/book-search" element={<BookSearch/>}/>
        {/* Video page */}
        <Route path="/video" element={<Video />} />

        {/* AudioBookPlayer page */}
        <Route path="/audio-book" element={<AudioBookPlayer />} />

        {/* Music Page */}
        <Route path="/music" element={<Music />} />


       {/* Reel page */}
        <Route path="/reels" element={<Reel/>}/>
        
        <Route path="/reels/uploadReels" element={<ReelUpload/>}/>

        {/* Form page for uploading the book */}
        <Route path="/upload-book" element={<UploadForm />} />


        {/* Contact-us page */}
        <Route path="/contact-us" element={<ContactPage />} />


        {/* Book Sell Page */}

        {/* <Route path="/*" element={<BuySellRoutes/>}/> */}

        {/* My Library Profile */}
        <Route path="/library-profile/*" element={ <LibraryProfilePage/>}/>

        {/* <Route path = "/buy-sell" element ={<HomeScreen/>}/> */}

        <Route path = "/buy-sell" element ={<HomeScreen/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
