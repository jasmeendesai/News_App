import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchMoreData = async () => {
    // setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
  };
  
  const updateNews = async ()=> {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true)
    
    let data = await fetch(url);
    props.setProgress(20)
    let parseData = await data.json();
    props.setProgress(50)
    setArticles(parseData.articles)
    setTotalResults(parseData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }


  useEffect(()=>{
    document.title = `${capitalize(props.category)} - News`;
    updateNews();
    // eslint-disable-next-line
  },[])

    return (
        <>
        <h1 className="text-center" style={{margin: '90px 35px 0px '}}>
          News - Top {capitalize(props.category)} Headlines
        </h1>
        {loading && <Loading/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
              {!loading &&
                articles.map((e) => {
                  return (
                    <div className="col-md-4" key={e.url}>
                      <NewsItem
                        title={e.title ? e.title.slice(0, 44) : " "}
                        description={
                          e.description ? e.description.slice(0, 80) : " "
                        }
                        imgUrl={
                          !e.urlToImage
                            ? "https://static.toiimg.com/thumb/msid-102458034,width-1070,height-580,imgsize-37956,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                            : e.urlToImage
                        }
                        newsUrl={e.url}
                        author={e.author}
                        date={e.publishedAt}
                        source={e.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}

News.defaultProps= {
  country: "in",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
