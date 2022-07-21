import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
  const capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
  const preWrittenarticles=[
    {
      source: {
        id: "news24",
        name: "News24",
      },
      author: "Sport24 staff",
      title:
        "Proteas confirmed for blockbuster tour to England in 2022 | Sport",
      description:
        "Cricket South Africa has confirmed a full tour for the Proteas men to England next year.",
      url: "https://www.news24.com/sport/Cricket/Proteas/proteas-confirmed-for-blockbuster-tour-to-england-in-2022-20210908",
      urlToImage:
        "https://cdn.24.co.za/files/Cms/General/d/11551/e94fe2fa7a894bf285726aa1f0360643.jpg",
      publishedAt: "2021-09-08T11:18:08+00:00",
      content:
        "Cricket South Africa (CSA) has confirmed a full tour for the Proteas men to England that will include three One-Day Internationals (ODIs), three T20 Internationals and three Test matches from 19 July… [+1267 chars]",
    },
    {
      source: {
        id: "bbc-sport",
        name: "BBC Sport",
      },
      author: "BBC Sport",
      title: "Ashes to 'hopefully' have full houses",
      description:
        'The Ashes will "hopefully" be played to full houses and on schedule despite a rise in Covid cases, Cricket Australia say.',
      url: "http://www.bbc.co.uk/sport/cricket/58484996",
      urlToImage:
        "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/B4F3/production/_120432364_gettyimages-1197102075.jpg",
      publishedAt: "2021-09-08T09:07:25.5946364Z",
      content:
        'England and Australia drew a thrilling series 2-2 in 2019, a result which saw Australia retain the urn\r\nThe upcoming Ashes series between England and Australia will "hopefully" be played in front of … [+2485 chars]',
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ]
  const [articles, setArticles] = useState(preWrittenarticles)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
  

  // articles = preWrittenarticles

  // For a class based Component
  // constructor(props) {
  //   super(props);
  //   console.log("Hello constructor from news.js");
  //   this.state = {
  //     articles: this.articles,
  //     loading: true,
  //     page: 1,
  //     totalResults: 0,
  //   };
  //   document.title = this.capitalizeFirstLetter(props.category)
  // }

 

  const updateNews=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4d6cc77a4bef42398c99c54dedd9e070&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    // this.setState({ loading: true });
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    props.setProgress(100);
  }

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4d6cc77a4bef42398c99c54dedd9e070&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    // setState({
    //   articles: articles.concat(parsedData.articles),
    //   totalResults: parsedData.totalResults,
    //   // loading: false,
    // });
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, [])

  // async componentDidMount() {
  //   this.updateNews();
  // }

  // handleNextClick = async () => {
  //   // console.log("next");
  //   // this.setState({ loading: true });
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=4d6cc77a4bef42398c99c54dedd9e070&page=${
  //   //   this.state.page + 1
  //   // }&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false,
  //   // });
  //   this.setState({page: this.state.page+1});
  //   this.updateNews();
  // };

  // handlePrevClick = async () => {
  //   // this.setState({ loading: true });
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=4d6cc77a4bef42398c99c54dedd9e070&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false,
  //   // });
  //   this.setState({page: this.state.page-1});
  //   this.updateNews();
  // };

    return (
      <>
        <h2 style={{margin: '100px 0px 10px', textAlign: 'center'}}>Newsmonkey- Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner />}
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={articles.length !== totalResults? <Spinner/>: null}>
        
        <div className="container">
          <div className="row">
            {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title} description={element.description} urlImage={!element.urlToImage?'https://image.shutterstock.com/image-vector/news-concept-thin-line-pixel-260nw-573975388.jpg': element.urlToImage} urlNews={element.url} author={element.author} date={element.publishedAt} source = {element.source.name}/>
                  </div>
                );
              })}
          </div>
        </div>
              </InfiniteScroll>
        
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            {" "}
            &larr; Prev
          </button>
          <button
            disabled={
              Math.ceil(this.state.totalResults / props.pageSize) <
              this.state.page + 1
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }


News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'health'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
} 

export default News;
