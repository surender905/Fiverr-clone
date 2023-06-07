/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const params = useParams();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [`${params.id}`],
    queryFn: () => newRequest.get(`/gigs/${params.id}`).then((res) => res.data),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  console.log(dataUser);

  return (
    <>
      {isLoading ? (
        <p>Loading..</p>
      ) : error ? (
        <p>Something went wrong</p>
      ) : (
        <div className="gig">
          <div className="container">
            <div className="left">
              <span className="breadcrumbs">
                Fiverr &gt; Graphics & Design &gt;
              </span>
              <h1>{data.title}</h1>
              {isLoadingUser ? (
                "loading"
              ) : errorUser ? (
                "something went wrong"
              ) : (
                <div className="user">
                  <img className="pp" src={dataUser.img} alt="" />
                  <span>{dataUser.username}</span>
                  {!isNaN(data.totalStars / data.starNumber) && (
                    <div className="stars">
                      {Array(5)
                        .fill()
                        .map((item, i) => (
                          <img src="/img/star.png" alt="" key={i} />
                        ))}
                      <img src="/img/star.png" alt="" />

                      <span>
                        {Math.round(data.totalStars / data.starNumber)}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                {data.images.map((img) => {
                  return <img key={img} src={img} alt="images" />;
                })}
              </Slider>
              <h2>About This Gig</h2>
              <p>{data.desc}</p>
              {isLoadingUser ? (
                <p>Loading..</p>
              ) : errorUser ? (
                <p>Something went wrong.....</p>
              ) : (
                <div className="seller">
                  <h2>About The Seller</h2>
                  <div className="user">
                    <img src={data.img} alt="user" />
                    <div className="info">
                      <span>{dataUser.username}</span>
                      <div className="stars">
                        {!isNaN(data.totalStars / data.starNumber) && (
                          <>
                            <img src="/img/star.png" alt="" />

                            <span>
                              {Math.round(data.totalStars / data.starNumber)}
                            </span>
                          </>
                        )}
                      </div>
                      <button>Contact Me</button>
                    </div>
                  </div>
                  <div className="box">
                    <div className="items">
                      <div className="item">
                        <span className="title">From</span>
                        <span className="desc">{dataUser.country}</span>
                      </div>
                      <div className="item">
                        <span className="title">Member since</span>
                        <span className="desc">Aug 2022</span>
                      </div>
                      <div className="item">
                        <span className="title">Avg. response time</span>
                        <span className="desc">4 hours</span>
                      </div>
                      <div className="item">
                        <span className="title">Last delivery</span>
                        <span className="desc">1 day</span>
                      </div>
                      <div className="item">
                        <span className="title">Languages</span>
                        <span className="desc">English</span>
                      </div>
                    </div>
                    <hr />
                    <p>{dataUser.desc}</p>
                  </div>
                </div>
              )}
              <Reviews gigId={params.id} />
            </div>
            <div className="right">
              <div className="price">
                <h3>{data.shortTitle}</h3>
                <h2>₹ {data.price}</h2>
              </div>
              <p>{data.shortDesc}</p>
              <div className="details">
                <div className="item">
                  <img src="/img/clock.png" alt="" />
                  <span>{data.deliveryTime} Days Delivery</span>
                </div>
                <div className="item">
                  <img src="/img/recycle.png" alt="" />
                  <span>{data.revisionNumber} Revisions</span>
                </div>
              </div>
              <div className="features">
                {data.features.map((f) => (
                  <div className="item" key={f}>
                    <img src="/img/greencheck.png" alt="icon" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Link to={`/pay/${params.id}`}>
                <button>Continue</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Gig;
