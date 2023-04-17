import React from 'react';
import Loader from './Loader';
import millify from 'millify';
import { useGetFeedQuery,useGetCountryFeedQuery } from '../services/appApi';
import { Typography, Row, Col, Statistic, Image, Card  } from 'antd';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import {Banner} from './index'
import { Carousel, Radio } from 'antd';
import {MLayout} from './index'
import demo from '../assets/pexels-marek-mucha-13339565.jpg'
const { Meta } = Card;


const { Title } = Typography;



const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


const Homepage = () => {
  const { data, isFetching }  =  useGetFeedQuery()
  const { data: coFeed } = useGetCountryFeedQuery('BR');



  const homeVideos = data?.aweme_list
  const coVideo = coFeed?.aweme_list


  if(isFetching) return <Loader />;
  
// console.log(homeVideos)
  return (
    <>
    <div className="c">

    <Row>
      <Col span={24} className="banner_col">
          <Banner />
        </Col>
    </Row>
    

    <Row gutter={[32,32]} className='crypto-card-container home_feed_container'>

    {homeVideos?.map((video)=>(
        <Col  xs={24} sm={12} lg={6} className='crypto-card' key={video?.author_user_id}>
          <Link key={video?.aweme_id} to={`/video/${video?.aweme_id}`} style={{display:'flex', justifyContent:'center'}}>
          
         <motion.div
           whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.9 }}
         >
          <div className="card_home"
          style={{
              width: 240,
              minHeight : '400px',
              marginTop:30,
              marginBottom:20,
              marginLeft:20,
              borderRadius:50,
              backgroundImage : `linear-gradient(to right, #00000080 0%, #0e003d80 60%, #35003d80 100%), url("${video.video?.cover.url_list[1] ? video.video?.cover?.url_list[0]:demo}")`,
              backgroundSize : 'cover',
              backgroundPosition : 'center center',
              border : '1px solid white',
            }}
          >
            <div className="video_details_home_shorts">
              <div className="views_on_home">
                {millify(video.statistics?.play_count)}
              </div>
            </div>
          </div>

         </motion.div>

          </Link>
        </Col>
      ))}

    </Row>

  </div>
    </>
  )
}

export default Homepage