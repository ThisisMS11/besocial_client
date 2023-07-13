import {Skeleton,Box} from '../imports/Muiimports'


const ChatSkelton = () => {
  return (
    <Box>
        <Box sx={{display:'flex',flexDirection:'column'}} >
            <Box sx={{display:'flex',justifyContent:'flex-start',marginTop:2 , marginX:2}}>
                <Skeleton variant="rectangular" width={350} height={60} sx={{borderRadius:2}}/>
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-end',marginTop:2 , marginX:2}}>
                <Skeleton variant="rectangular" width={350} height={60} sx={{borderRadius:2}}/>
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-start',marginTop:2 , marginX:2}}>
                <Skeleton variant="rectangular" width={350} height={60} sx={{borderRadius:2}}/>
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-end',marginTop:2 , marginX:2}}>
                <Skeleton variant="rectangular" width={350} height={60} sx={{borderRadius:2}}/>
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-start',marginTop:2 , marginX:2}}>
                <Skeleton variant="rectangular" width={350} height={60} sx={{borderRadius:2}}/>
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-end',marginTop:2 , marginX:2}}>
                <Skeleton variant="rectangular" width={350} height={60} sx={{borderRadius:2}}/>
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-start',marginTop:2 , marginX:2}}>
                <Skeleton variant="rectangular" width={350} height={60} sx={{borderRadius:2}}/>
            </Box>
        </Box>
    </Box>
  )
}

export default ChatSkelton