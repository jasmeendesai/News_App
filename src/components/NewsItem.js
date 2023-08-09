import React from "react";

const NewsItem =(props)=> {

    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <div className="container my-3">
        <div className="card">
          <div style={{display:'flex', justifyContent: 'flex-end', position:'absolute', right:'0'}}>
          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
        
          <img src={imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );

}

export default NewsItem;
