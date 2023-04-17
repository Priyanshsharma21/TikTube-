import React, { useEffect, useState } from 'react'
import {useRelatedVideosQuery,useVideoDetailsQuery,useChannelDetailsQuery,useVideoCommentsQuery} from '../services/youtubeApi'
import { Typography, Row, Col, Statistic, Image, Card,Input, Avatar, Button, Collapse,Comment, Tooltip   } from 'antd';
import { Link,useParams } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';
import millify from 'millify';
import { CommentOutlined, EyeFilled, LikeFilled,DislikeFilled, DislikeOutlined, LikeOutlined  } from '@ant-design/icons';


const { Search } = Input;
const { Meta } = Card;
const {Text,Title} = Typography
const { Panel } = Collapse;

const colors = ["#ECECEC", "#F5F5F5", "#D1D1D1", "#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D", "#F8ECC2", "#E6D3A3", "#C8B560", "#7EA172", "#486B67", "#313D3E", "#E2EB98", "#B9C46A", "#8D9440", "#E67F6E", "#58B2DC", "#364F6B"]

const YoutubeDetails = () => {
  const params = useParams();
  const {id} = params
  const [colorIndex, setColorIndex] = useState(0);

  const {data,isFetching} = useVideoDetailsQuery({id:id})
  const {data:videoComment} = useVideoCommentsQuery({id:id})
  const items = data ? data.items[0] : []
  const comments = videoComment?.items


  useEffect(() => {
    const intervalId = setInterval(() => {
      const number = Math.floor(Math.random() * colors.length);
        setColorIndex(number);
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

  const {data:relatedVideo} = useRelatedVideosQuery({id:id})
  const rel = relatedVideo?.items


  const {data:channelDetail} = useChannelDetailsQuery({id:items?.snippet?.channelId})

  // const [channelD, setChannelD] = useState(channelDetail?.items[0] ? channelDetail?.items[0] : [])

  const [tag1, tag2, tag3, tag4] = items?.snippet?.tags ? items.snippet.tags : []
  const channelItem = channelDetail?.items?.[0]?.id ? channelDetail.items[0] : []

  if(isFetching) return <Loader />

  const color = colors[colorIndex];
  const color2 = colors[colorIndex + 1]

  return (
    <div>
      <Row gutter={[10,10]}>
        {/* video */}
        <Col lg={18} sm={12} xs={24}>
          <div className="ytVideo">
            <iframe 
            className='if'
            style={{ boxShadow: `0px 0px 150px 5px ${color}, 0px 0px 150px 5px ${color2}` }}
            width="560" 
            height="315" 
            
            src={`https://www.youtube.com/embed/${params.id}`}
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
            </iframe>
          </div>

          {/* video details */}
          <Row className="video_make_me_marg">
            <Col className="video_details_col_2">
            <div className="tags">
              <Text className="detail_text">
                {items?.snippet?.tags ?(
                    <>
                      #{tag1} #{tag2} #{tag3} #{tag4}
                    </>
                ):(
                  <>
                  {items?.snippet?.localized?.description.slice(0,40)}...
                  </>
                )}
              </Text>
            </div>
              <div className="title">
                <Title className="title_in">
                    {items?.snippet?.title}
                </Title>
              </div>

            </Col>
          </Row>

          {/* channelDetails */}

          <Row>
            <Col className="video_details_col_2">
              <div className="channel_col_1">
              <div className="channel_avatar">
                  <Link to={`/channel/${items?.snippet?.channelId}`}>
                    <Avatar src={channelItem?.snippet?.thumbnails?.high?.url} size='large' className="banner_avatar_imgs" />
                  </Link>
              </div>
              <div className="channel_name">
              <Link to={`/channel/${items?.snippet?.channelId}`}>
                <Text className="channel_names">{channelItem?.snippet?.title}</Text>
              </Link>
                <Text className="channel_names2">{millify(channelItem?.statistics?.subscriberCount)}&nbsp;subscribers</Text>
              </div>
                  <Button className="btn_subs" type="primary" danger target="_blank" href={`https://www.youtube.com/c/${channelItem?.snippet?.customUrl}`}>
                      Subscribe
                  </Button>
              </div>
            </Col>

            <Col className="video_details_col_2" style={{marginTop:'10px'}}>
              <div className="stats_btns">
                  <Button className="btn_stats" type="primary" danger target="_blank" href={`https://www.youtube.com/c/${channelItem?.snippet?.customUrl}`}>
                    <LikeFilled />&nbsp;{millify(items?.statistics?.likeCount)}
                  </Button>
                  <Button className="btn_stats" type="primary" danger target="_blank" href={`https://www.youtube.com/c/${channelItem?.snippet?.customUrl}`}>
                  <CommentOutlined />&nbsp;{millify(items?.statistics?.commentCount)}
                  </Button>
                  <Button className="btn_stats" type="primary" danger target="_blank" href={`https://www.youtube.com/c/${channelItem?.snippet?.customUrl}`}>
                  <EyeFilled />&nbsp;{millify(items?.statistics?.viewCount)}
                  </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="video_details_col_2" style={{marginTop:'5px'}}>
              <Text style={{color:'#dcdcdc', marginTop:'20px', fontWeight:600}}>
              {millify(items?.statistics?.viewCount)}&nbsp;
              Uploded &nbsp;
              {moment(items?.snippet?.publishedAt).startOf('ss').fromNow()}
              </Text>
            </Col>
          </Row>


          <Row>
            <Col className="video_details_col_2" style={{marginTop:'5px'}}>
            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header="Description" key="1"  className="collaps_style">
                <p className="collaps_style">{items?.snippet?.description}</p>
                <p className="collaps_style">{}</p>
              </Panel>
            </Collapse>
            </Col>
          </Row>

          <Row>
            <Col className="video_details_col_2">
            {comments?.map(comment=>(
              <Comment
                // actions={actions}
                author={<a>{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName}</a>}
                avatar={<Avatar src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} alt={comment?.snippet?.topLevelComment?.snippet?.authorDisplayName} />}
                content={
                  <>
                    <p>
                    {comment?.snippet?.topLevelComment?.snippet?.textOriginal}
                  </p>
                  <p style={{marginTop:'5px'}}>
                    <LikeFilled />&nbsp;&nbsp;{millify(comment?.snippet?.topLevelComment?.snippet?.likeCount)}
                  </p>
                  </>
                }
                datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            ))}
            </Col>
          </Row>


        </Col>

    {/* suggested videos */}
      <Col lg={6} sm={12} xs={24} className="details_yt_col">
       {rel?.map(video=>(
          <Link to={`/yt/${video?.id?.videoId}`} style={{display: 'flex', justifyContent:'center'}}>
              {video?.snippet?.channelId &&(
                <>
                <Card
                    style={{ width: 300, marginBottom:'20px' }}
                    hoverable
                    cover={
                    <img
                        alt="example"
                        src={video?.snippet?.thumbnails?.high?.url}
                    />
                    }
                >
                <Meta
                    avatar={<Avatar src={video?.snippet?.thumbnails?.default?.url} />}
                    title={video?.snippet?.title}
                    description={video?.snippet?.description.slice(0,20)}
                    />

                </Card>
                </>
              )}

          </Link>
       ))}
       </Col>
      </Row>
    </div>
  )
}

export default YoutubeDetails