import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar,Badge, Card, Image, Carousel } from 'antd';
import moment from 'moment';
import { useGetCountryFeedQuery } from '../services/appApi';
import {country,countries} from '../assets/constant'
import Loader from './Loader';
import demo from '../assets/pexels-marek-mucha-13339565.jpg'
import { Link } from 'react-router-dom';
import millify from 'millify';

const demoImage = '';

const { Text, Title } = Typography;
const { Option } = Select;

const Country = ({simplified}) => {
  const [countryFeed, setCountryFeed] = useState('US')
  const { data: feedData, isFetching } = useGetCountryFeedQuery(countryFeed);
  const { data: coFeedData } = useGetCountryFeedQuery('MX');



  const feeds = feedData?.aweme_list
  const coData = coFeedData?.aweme_list

  if (isFetching) return <Loader />;




  return (
    <div>

    <Row style={{marginTop: '10px', paddingLeft: '20px'}}>
      <Col span={24}>
        <Select
        className='select-news' 
        placeholder="Select a Country" 
        optionFilterProp="children"
        onChange={(value)=>setCountryFeed(value)}
        filterOption={(input, option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>= 0}
        >

        <Option>US</Option>
        {countries.map((code)=><Option value={code.code}>{code.name}</Option>)}
        </Select>

        </Col>
    </Row>

    <Row gutter={[32,32]} style={{marginTop: '30px', paddingLeft: '20px',paddingRight: '20px'}}>
      {feeds?.map((feed,i)=>(
        <Col xs={24} sm={12} lg={8} key={i}>
       
          <Card hoverable className='news-card'>
          <Badge.Ribbon color="pink" text={millify(feed?.statistics?.play_count)} overflowCount={999}>
              <Link to={`/video/${feed?.aweme_id}`}>
              <div className="img_country">
                <Image width={300} height={500} src={feed.video?.cover.url_list[1] ? feed.video?.cover?.url_list[0]:demo} />
              </div>
              </Link>
          </Badge.Ribbon>
              
          </Card>

        </Col>
      ))}
    </Row>

    <Row>
      <Col>
      
      </Col>
    </Row>

    </div>
  )
}

export default Country