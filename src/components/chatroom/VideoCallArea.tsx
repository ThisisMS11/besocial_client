import VideoElement from "./VideoElement"
import { IconButton } from '../imports/Muiimports'
import CloseIcon from '@mui/icons-material/Close';
const VideoCallArea = ({ streams, handleVideoClose }:
    {
        streams: MediaStream[] | null,
        handleVideoClose: () => void;
    }) => {


    return (
        <div className='p-2 h-full'>
            <div className="text-right">
                <IconButton sx={{ marginX: 'auto', border: 'solid 2px #33353a' }} onClick={handleVideoClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="border-2 h-full rounded-xl border-[#33353a] p-4">
                {streams?.map((stream: MediaStream, index: number) => {
                    return <VideoElement key={index} stream={stream} />
                })}
            </div>
        </div>

    )
}

export default VideoCallArea;