import { defineComponent, onMounted, ref } from 'vue'
import { BlobServiceClient } from '@azure/storage-blob';
import { Image } from '@/models'

export default defineComponent({
    name: 'Gallery',
    setup() {
        const account = process.env.VUE_APP_STORAGE_ACCOUNT
        const thumbnailContainer = process.env.VUE_APP_STORAGE_THUMBNAIL_CONTAINER
        const imageContainer = process.env.VUE_APP_STORAGE_IMAGES_CONTAINER
        const sasToken = process.env.VUE_APP_STORAGE_SAS

        const thumbnails = ref([] as Image[])
        const blobServiceClient = ref({} as BlobServiceClient)
        const thumbnailContainerClient = ref()


        onMounted(async () => {
            await fetchThumbnails();
        })

        async function fetchThumbnails () {
            if (!account || !sasToken || !thumbnailContainer) {  // check if the credentials are set
                alert('Please make sure you have set the correct Azure Storage credentials in the .env file');
                return;
            }
            
            blobServiceClient.value = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`) // create a blobServiceClient
            thumbnailContainerClient.value = blobServiceClient.value.getContainerClient(thumbnailContainer);  // create a thumbnail containerClient

            try {
                await fetchUrls()                
            } catch (error) {
                console.error(error);  // Handle error
            }
        }

        async function fetchUrls() {
            const blobItems = thumbnailContainerClient.value.listBlobsFlat();  // get all blobs in the container     
            for await (const blob of blobItems) {
                const tempBlockBlobClient = thumbnailContainerClient.value.getBlockBlobClient(blob.name);  // get the blob url
                thumbnails.value.push({ name: blob.name, url: tempBlockBlobClient.url } as Image);  // push the image name and url to the urls array
            }
        }

        return {
            thumbnails,
        }
    }
})
