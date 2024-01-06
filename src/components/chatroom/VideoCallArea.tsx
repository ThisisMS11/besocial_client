import VideoElement from "./VideoElement"
import { IconButton } from '../imports/Muiimports'
import CloseIcon from '@mui/icons-material/Close';
const VideoCallArea = ({ streams, handleVideoClose }:
    {
        streams: MediaStream[] | null,
        handleVideoClose: () => void;
    }) => {

    return (
        // <div className='m-2 bb h-[98vh]'>
            <div className="border-2 h-full rounded-xl  border-[#33353a]">
                <div className="text-center">
                    <IconButton sx={{ marginX: 'auto', border: 'solid 2px #33353a' }} onClick={handleVideoClose}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <div className="flex flex-col">

                    {streams?.map((stream: MediaStream, index: number) => {
                        return <VideoElement key={index} stream={stream} />
                    })}
                </div>

            </div>
        // </div>

    )
}

export default VideoCallArea;