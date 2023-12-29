import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeClickSearch,
  doClickSearch,
  setLongUrl,
  setShortUrl,
} from "../features/clicks/clickSlice";
import axios from "axios";

const Search = () => {
  const dispatch = useDispatch();
  const {longUrl} = useSelector((store)=>store.click)
  const [url,setUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false)
  const [status,setStatus] = useState(false)
  const longUrlInputRef = useRef(null); // Create a reference to the input element

  useEffect(() => {
    if (longUrl === "") {
      longUrlInputRef.current.focus();
    }
  }, [longUrl]);

  const handleSubmit = async (e) => {
    dispatch(closeClickSearch())
    setLoading(true)
    setError(false);
    setStatus(false)
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/url/shorten", {
        longUrl:url,
      });
      if (res.data) {
        dispatch(setLongUrl(res.data.longUrl))
        dispatch(setShortUrl(res.data.shortUrl));
        dispatch(doClickSearch());
      }
      setLoading(false)
    } catch (error) {
        console.log(error.response.data);
        if(error.response.data){
          setStatus(true)
        }
        setError(true);
        setLoading(false)
    }
  };

  return (
    <div className="search">
      <div className="header">
        <h1>SHORTLY</h1>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1017/1017466.png"
          alt=""
        />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={longUrlInputRef}
          className="long-url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Long Url"
        />
        <button className="shorten-btn" type="submit">
          Shorten
        </button>
      </form>
      {status ? <span className="invalid">Invalid Url... Please Provide Valid Url</span> : error && <span>Something Went Wrong</span>}
      {loading && <span>Loading ...</span>}
    </div>
  );
};

export default Search;
