import React ,{useState} from "react";
import SwiperComponent from "./SwiperComponent";
import CommentBox from "./CommentBox";

function ContentWrapper() {

  const [isCommentBoxActive, setCommentBoxIsActive] = useState(false);
  const[reelId,setReelId]=useState(null)
  const toggleCommentBox = (reelId) => {
    setCommentBoxIsActive(!isCommentBoxActive);
    setReelId(reelId)
  };

  return (
    <div className="content-wrapper">
           <div className="category-list">
          <button className="category-button active">All Books</button>
          <button className="category-button">Fiction</button>
          <button className="category-button">Non-Fiction</button>
          <button className="category-button">Science Fiction</button>
          <button className="category-button">Biography</button>
          <button className="category-button">History</button>
          <button className="category-button">Poetry</button>
          <button className="category-button">Travel</button>
          <button className="category-button">Business</button>
          <button className="category-button">Technology</button>
          <button className="category-button">Health</button>
          <button className="category-button">Start-ups</button>
          <button className="category-button">Self-help</button>
          <button className="category-button">Cooking</button>
          <button className="category-button">Art</button>
          <button className="category-button">Photography</button>
          
        

      </div>
    
      <SwiperComponent toggleCommentBox={toggleCommentBox}/>
      {isCommentBoxActive &&  <CommentBox isCommentBoxActive={isCommentBoxActive} toggleCommentBox={toggleCommentBox} reelId={reelId}/>}
     
          
    </div>
  );
}

export default ContentWrapper;
