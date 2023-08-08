import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(this.props.category)} - News`;
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading: true,
    // });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  async update() {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseData = await data.json();
    this.props.setProgress(70)
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c6950daae9bb4c1993257156e8f4e8b5&page=1&pageSize=${this.props.pageSize}`
    // this.setState({
    //     loading : true
    // })
    // let data = await fetch(url)
    // let parseData = await data.json()
    // this.setState({
    //     articles : parseData.articles,
    //     totalResults : parseData.totalResults,
    //     loading : false
    // })
    this.update();
  }

  // handlePreClick= async ()=>{
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c6950daae9bb4c1993257156e8f4e8b5&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
  // this.setState({
  //     loading : true
  // })
  // let data = await fetch(url)
  // let parseData = await data.json()
  // this.setState({
  //     articles : parseData.articles,
  //     page : this.state.page-1,
  //     loading : false
  // })
  //   this.setState({page:this.state.page-1})
  //   this.update()
  // }
  // handleNextClick= async ()=>{
  // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c6950daae9bb4c1993257156e8f4e8b5&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
  // this.setState({
  //     loading : true
  // })
  // let data = await fetch(url)
  // let parseData = await data.json()
  // this.setState({
  //     articles : parseData.articles,
  //     page : this.state.page+1,
  //     loading : false

  // })
  // }
  // this.setState({page:this.state.page+1})
  // this.update()
  // }

  render() {
    return (
        <>
        <h1 className="text-center my-3">
          News - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {this.state.loading && <Loading/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
              {!this.state.loading &&
                this.state.articles.map((e) => {
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
        {/* {!this.state.loading && <div className="container d-flex justify-content-between my-3">
          <button disabled={this.state.page<=1} type="button" className="btn btn-primary" onClick={this.handlePreClick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>} */}
      </>
    );
  }
}

export default News;
