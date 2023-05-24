import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, colors, Box } from '@mui/material';
import { styled } from "@mui/material/styles";
import ImageIcon from '@mui/icons-material/Image';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import { IconButton } from '@mui/material';
import theme from "../../theme";
import Grid from '@mui/material/Grid';

/* FilePond Imports */
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

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

const TextEditor = () => {
    const classes = useStyles();
    const [content, setContent] = React.useState('');

    /* //! Solve this type using typescript. */
    const [files, setFiles] = useState<Array<any>>([])

    const [uploadedfilesdata, setUploadedfilesdata] = useState<String[]>([]);


    const handleContentChange = (event: any) => {
        setContent(event.target.value);
    };


    const handleSubmit = () => {
        // console.log('files: ', files);

        /*By using Promise.all and files.map, we create an array of promises. Each promise represents the file encoding process for a specific file. By using Promise.all, we ensure that all promises are resolved before proceeding. */

        Promise.all(
            files.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    const fileObject = file.file;

                    if (fileObject) {
                        reader.readAsDataURL(fileObject);
                        reader.onloadend = () => {
                            const base64String = reader.result as string;
                            resolve({ [fileObject.name]: base64String });
                        };
                        reader.onerror = () => {
                            reject(new Error('Failed to read the file.'));
                        };
                    } else {
                        reject(new Error('Invalid file.'));
                    }
                });
            })
        ).then((fileDataArray) => {
            const updatedData = Object.assign({}, ...fileDataArray);
            setUploadedfilesdata((prevData) => ({ ...prevData, ...updatedData }));
        })
            .catch((error) => {
                console.error('Error occurred while reading files:', error);
            });

        setContent('');
    };

    const showuploadedfiles = () => {
        /* uploaded files data is going to be here */
        console.log('uploaded files base 64 encoding:', uploadedfilesdata);
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
                        <Button variant="contained" color="primary" onClick={showuploadedfiles} >
                            Save Draft
                        </Button>

                    </Box>
                </Grid>
                <Grid item xs={5} >

                    <FilePond
                        files={files}
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
