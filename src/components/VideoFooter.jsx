import React from 'react'
import {FiMusic} from 'react-icons/fi'


const VideoFooter = ({userName,desc,trackImg}) => {
  return (
    <div className='videoFooter'>
        <div className="videoFooter_text">
            <h3 className='username'>@{userName}</h3>
                <p className='desc_name'>{desc.slice(0,20)}</p>
                    <div className="video_footer_ticker">
                {/* <Tickers /> */}
            </div>
        </div>
    </div>
  )
}

export default VideoFooter