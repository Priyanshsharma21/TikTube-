import React, { useEffect, useState } from 'react'
import { useGetFeedQuery } from '../services/appApi';
import {Link} from 'react-router-dom'
import Loader from './Loader'
import millify from 'millify';
import { Avatar,Typography } from 'antd';
const {Title} = Typography

const Banner = () => {
  const [bannerDetails, setBannerDetails] = useState([])
  const { data, isFetching }  =  useGetFeedQuery()

  
  useEffect(()=>{
    setBannerDetails(data.aweme_list[0])
  },[data.aweme_list[0].aweme_id])

// console.log(bannerDetails)


  if(isFetching) return <Loader />;

console.log(bannerDetails)

  return (
    <div className="banner">
    <header
     className='banner'
     style={{
        backgroundSize : "cover",
        backgroundPosition:"center center",
        // backgroundImage : `url("${bannerDetails?.video?.cover?.url_list[0]}")`,
        backgroundImage : `linear-gradient(to left, #00000093 0%, #0e003d98 60%, #35003d96 100%), url("${bannerDetails?.video?.cover?.url_list[0]}")`,
     }}
     >



    <div className="banner__contents">
        
        <div className="start_watching">START WATCHING</div>
        <h1 className='banner__title'>{bannerDetails?.desc}</h1>

        <h1 className="banner__description">
          {bannerDetails?.author?.nickname}
        </h1>

        <div className="meta mt-4 max-w-[200px] flex justify-between text-white">
                  <div className="rating text-[1rem]"> {bannerDetails?.music?.album}</div>
                  <div className="dot">•</div>
                  <div className="rating text-[1rem]"> {bannerDetails?.music?.author}</div>
        </div>

        <div className="banner__buttons">
          <a target="_blank" rel="noreferrer" href={bannerDetails?.share_info?.share_url}  className="banner_share">SHARE</a>
          <Link className="share_btn" to={`video/${bannerDetails?.aweme_id}`}><button className='banner__button'>SEE DETAILS</button></Link>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>

    </div>
  )
}

export default Banner