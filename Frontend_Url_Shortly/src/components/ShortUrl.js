import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLongUrl, closeClickSearch } from "../features/clicks/clickSlice";

const ShortUrl = () => {

  const {longUrl,shortUrl} = useSelector((store)=>store.click)
  
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useDispatch()

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const closeShortUrl = () =>{
    dispatch(closeClickSearch())
    dispatch(clearLongUrl())
  }


  return (
    <div className="shortUrl">
      <p>Your Long URL</p>
      <input type="text" className="short-url" value={longUrl} disabled />

      <p>Short URL</p>
      <input
        type="text"
        className="short-url"
        value={shortUrl}
        disabled
      />

      <div className="btn-row">
        <button className="search-btn" onClick={() => openInNewTab(shortUrl)}>
        <img className="copy-img" src="https://cdn-icons-png.flaticon.com/128/49/49116.png" alt="" />
          Search
        </button>
        <button className="copy" onClick={() => copyToClipboard(shortUrl)}>
          <img className="copy-img" src="https://cdn-icons-png.flaticon.com/128/1620/1620767.png" alt="" />
        Copy
        </button>
        {isCopied && (
          <span className="clipboard">
            Copied to clipboard
          </span>
        )}
      </div>

        <button className="myUrl" onClick={closeShortUrl}>Shorten Another</button>
 
    </div>
  );
};

export default ShortUrl;