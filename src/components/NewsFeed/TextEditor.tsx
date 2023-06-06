import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, colors, Box } from '@mui/material';
import { styled } from "@mui/material/styles";
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { IconButton } from '@mui/material';
import theme from "../../theme";
import Grid from '@mui/material/Grid';

import { useUtils } from '..';

/* FilePond Imports */
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import axios from 'axios';
import { SettingsPowerRounded } from '@mui/icons-material';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const useStyles = makeStyles({
    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1500px',
        padding: '0.1rem',
        backgroundColor: theme.palette.MyBackgroundColors.bg2,
    }
});

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: 'white',
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: 'white',
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: theme.palette.MyBackgroundColors.bg2,
        },
        "&:hover fieldset": {
            borderColor: theme.palette.MyBackgroundColors.bg2,
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.MyBackgroundColors.bg2,
        },
    },
    input: {
        "&::placeholder": {
            fontStyle: "italic",
        },
    },
});

interface MyComponentProps {
    setOpen: (state: boolean) => void;
}

const TextEditor: React.FC<MyComponentProps> = ({ setOpen }) => {
    const classes = useStyles();
    const [content, setContent] = React.useState('');

    /* //! Solve this type using typescript. */
    const [files, setFiles] = useState<File[] | null>(null);

    const handleContentChange = (event: any) => {
        setContent(event.target.value);
    };

    const utils = useUtils();

    const handleSubmit = async () => {

        let i: number = 0;
        let v: number = 0;

        /* images data */
        const Formimages = new FormData();
        const FormVideos = new FormData();

        if (files) {

            /* for images seperation */
            files.forEach((file: any) => {
                file = file.source;
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    Formimages.append('file', file);
                    i++;
                }
            });

            /* for videos seperation */
            files.forEach((file: any) => {
                file = file.source;
                if (file.type === 'video/mp4' || file.type === 'video/ogg') {
                    FormVideos.append('file', file);
                    v++;
                }
            });
        }

        const token = localStorage.getItem('token');

        try {

            utils?.setLoading(true);

            /* Closing the Modal */
            setOpen(false);

            /* Creating Post record first */
            const post = await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/`, { PostString: content }, {
                headers: {
                    'authorisation': `Bearer ${token}`
                }
            })

            /* if images exists */
            if (i > 0 && post) {

                const imageuploadRes = await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/uploadImages/${post.data.data.id}`, Formimages, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorisation': `Bearer ${token}`
                    }
                })
                console.log('Image upload response : ', imageuploadRes.data);
            }

            /* if videos exists */
            if (v > 0 && post) {
                const videoUplodRes = await axios.post(`${import.meta.env.VITE_APP_URL_LOCAL}/api/v1/post/uploadVideos/${post.data.data.id}`, FormVideos, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorisation': `Bearer ${token}`
                    }
                })
                console.log('Videos upload response : ', videoUplodRes.data);
            }

            utils?.successnotify("Post Successfully Added");
        } catch (error: any) {
            console.log('upload error : ', error);
            utils?.errornotify(error.message);
        }

        utils?.setLoading(false);

    };


    return (
        <div className={classes.postContainer}>
            <Grid container spacing={1}>
                <Grid item xs={7}>
                    <CssTextField
                        label="Post Content"
                        multiline
                        rows={8}
                        // variant="outlined"
                        value={content}
                        onChange={handleContentChange}
                        sx={{ marginBottom: 4 }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                        <Button variant="contained" color="primary" onClick={handleSubmit} >
                            Post
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSubmit} >
                            Save Draft
                        </Button>

                    </Box>
                </Grid>
                <Grid item xs={5} >

                    <FilePond
                        files={files as any}
                        onupdatefiles={setFiles}
                        allowMultiple={true}
                        maxFiles={3}
                        server="/api"
                        name="files"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                </Grid>

            </Grid>

        </div>
    );
};

export default TextEditor;
