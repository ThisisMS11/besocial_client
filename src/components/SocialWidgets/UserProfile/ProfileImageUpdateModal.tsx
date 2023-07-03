import { Modal, Button, Box } from '../../imports/Muiimports'
import { useState, useEffect } from '../../imports/Reactimports'
import theme from '../../../theme';
import { useMutation } from '@tanstack/react-query';
import { updateProfileImage, useUtils } from '../..';
/* FilePond Imports */
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import { useQueryClient } from '@tanstack/react-query';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { AxiosError } from 'axios';


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: theme.palette.MyBackgroundColors.bg2,
    boxShadow: 24,
    padding: 2,
    color: 'white',
    borderRadius: 2,
    textAlign: 'center'
};


const ProfileImageUpdateModal = ({ openModalref }: { openModalref: React.RefObject<HTMLButtonElement> }) => {

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const utils = useUtils();
    const queryClient = useQueryClient();

    const [files, setFiles] = useState<any | null>(null);

    const Imageform = new FormData();

    /* To put the new uploaded image into formdata */
    const mediaFilter = () => {
        const file = files[0].source;

        if (!file) return alert("Please upload a valid image file");

        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            Imageform.append('file', file);
        } else {
            alert("Please upload a valid image file")
        }
    }

    const handleUpdate = async () => {
        mediaFilter(); // Populate Imageform
        await uploadImageMutation.mutateAsync(); // Await the mutation
    };

    /* To upload the image */
    const uploadImageMutation = useMutation({
        mutationFn: () => updateProfileImage(Imageform),
        mutationKey: ['updateProfileImage']
    })

    useEffect(() => {
        let { status, error, isLoading, data } = uploadImageMutation;

        console.log({ status, error, isLoading, data });

        // utils?.setLoading(isLoading);

        if (status == 'loading') { utils?.setLoading(true); handleClose(); }

        if (status == 'success') {
            utils?.successnotify('Image Updated Successfully');
            queryClient.invalidateQueries(["userinfo"]);
            queryClient.invalidateQueries(["alluserposts"]);
        }

        if (error) {
            const message = utils?.GetErrorMessage(error as AxiosError)
            utils?.errornotify(message as string);
        }

    }, [uploadImageMutation.status])


    return (
        <div>
            <Button onClick={handleOpen} ref={openModalref} sx={{ display: 'none' }}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <FilePond
                        files={files as any}
                        onupdatefiles={setFiles}
                        allowMultiple={false}
                        name="files"
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                    <Button variant='contained' className='border-2 border-white w-full' color='info'
                        onClick={handleUpdate}
                    >Update</Button>
                </Box>
            </Modal>
        </div >
    )
}

export default ProfileImageUpdateModal