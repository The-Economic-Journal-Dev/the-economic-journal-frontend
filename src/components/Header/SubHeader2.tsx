import style from "./SubHeader2.module.css"
import houseLogo from "../../../public/house_icon.jpg";
import { auth } from "../../firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

// TypeScript interface to define the schema fields for Article
interface IArticleData  {
  authorUid: string;
  title: string;
  metaTitle: string;
  datePublished: Date;
  lastUpdated: Date;
  imageUrl?: string;
  summary?: string;
  articleBody: string;
  category: "Finance" | "Economic" | "Business" | "Entrepreneurship";
  likesCount: number;
}

const SearchButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const response = await fetch(`https://api.theeconomicjournal.org/articles/search?search=${searchQuery}`);
      const posts = (await response.json()).articles as IArticleData[];

      console.log(posts)
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={style.searchContainer}>
      <button className={style.searchBTN} onClick={toggleSearchBar}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
      {isExpanded && (
        <input
          type="text"
          className={style.searchInput}
          placeholder="Not available..."
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          // onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

function SubHeader2() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className={style.SubHeader2}>
      <a href="/home">
        <div className={style.logo}>
          <img src={houseLogo} alt="Logo" />
          <span className={style.separator}></span>
          <h1>
            THE
            <span>
              <div style={{ color: "#E1A054" }}>Economic</div>
              <div style={{ color: "#9F0505" }}>Journal</div>
            </span>
          </h1>
        </div>
      </a>
      <div className={style.authSearch}>
        {!currentUser && <a href="/signin">Sign in</a>}
        {currentUser && !currentUser?.photoURL &&(
          <a href="./profile">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              alt=""
            />
          </a>
        )}

        {currentUser && currentUser.photoURL && (
          <a href="./profile">
            <img
              src={currentUser.photoURL}
              alt=""
            />
          </a>
        )}
        <span className={style.separator}></span>
        <SearchButton />
      </div>
    </div>
  );
}

export default SubHeader2;
