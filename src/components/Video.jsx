import React, { useEffect, useRef, useState } from 'react'
import '../assets/Video.css'


const colors = ["#F2F2F2AA", "#F9F9F9AA", "#D8D8D8AA", "#FFC8A8AA", "#FFA0A0AA", "#E28B8BAA", "#A97C7CAA", "#5E7C8CAA", "#FBE5C4AA", "#EED5A5AA", "#D8BA74AA", "#94BFA2AA", "#6A8E8BAA", "#515D5EAA", "#DCEEA8AA", "#C0D77AAA", "#A4B451AA", "#F2A4A4AA", "#7EBEDCAA", "#576B7BAA"];

const Video = ({videoUrl}) => {
    const [playing, setPlaying] = useState(false)
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((colorIndex) => (colorIndex + 1) % colors.length);
    }, 6000);
    return () => clearInterval(intervalId);
  }, []);

    const videoRef = useRef(null)
    const onVideoPress=()=>{
        if(playing){
            videoRef.current.pause()
            setPlaying(false)
        }else{
            videoRef.current.play()
            setPlaying(true)
        }
    }

    const color = colors[colorIndex];
    const color2 = colors[colorIndex + 1]


  return (
    <div className="videoz">
        <video style={{ boxShadow: `0px 0px 600px 10px ${color}, 0px 0px 600px 10px ${color2}` }} className='video__playerz' src={videoUrl} loop ref={videoRef} onClick={onVideoPress} />
    </div>
  )
}

export default Video