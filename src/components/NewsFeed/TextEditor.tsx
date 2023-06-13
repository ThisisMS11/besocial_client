import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Box } from '@mui/material';
import { styled } from "@mui/material/styles";
import theme from "../../theme";
import Grid from '@mui/material/Grid';

import { CreatePostFunc, UploadPostImagesFunc, UploadPostVideosFunc } from '..';

/* FilePond Imports */
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useMutation } from '@tanstack/react-query';


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
    const [files, setFiles] = useState<any | null>(null);

    const handleContentChange = (event: any) => {
        setContent(event.target.value);
    };

    // const utils = useUtils();


    /* images data */
    const Formimages = new FormData();
    const FormVideos = new FormData();
    let i: number = 0;
    let v: number = 0;


    /* Post Creation Mutation */

    const CreatePostMutation = useMutation({
        mutationFn: (content: string) => CreatePostFunc(content),
        mutationKey: ["CreatePostMutation"],

        onSuccess: (data: any) => {
            const postId = data.data.data.id
            console.log(data);
            if (i > 0) {
                console.log("image uploading taking place");
                UploadPostImagesMutation.mutate({ Formimages, postId })
            }
        }
    })

    /* Post Images Upload Mutation */
    const UploadPostImagesMutation = useMutation({
        mutationFn: (mutationData: { Formimages: any; postId: string }) =>
            UploadPostImagesFunc(mutationData.Formimages, mutationData.postId),

        mutationKey: ["UploadPostImagesMutation"],
        onSuccess: (data: any) => {
            console.log(data.data)
            const postId = data.data.data.id
            if (v > 0) {
                console.log('videos uploading is taking place');
                UploadPostVideosMutation.mutate({ FormVideos, postId });
            }
        }
    })

    /* Post Videos Upload Mutation */
    const UploadPostVideosMutation = useMutation({
        mutationFn: (mutationData: { FormVideos: any; postId: string }) =>
            UploadPostVideosFunc(mutationData.FormVideos, mutationData.postId),
        mutationKey: ["UploadPostVideosMutation"]
    })

    const handleSubmit = async () => {

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


        // utils?.setLoading(true);

        setOpen(false);

        /* calling mutation */
        CreatePostMutation.mutate(content);
    };


    useEffect(() => {
        const { status, error, data } = CreatePostMutation;
        console.log({ status, error, data });

    }, [CreatePostMutation.status])




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
