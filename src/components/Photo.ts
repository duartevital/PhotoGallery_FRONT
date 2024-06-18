import { Image } from "@/models";
import { BlobServiceClient } from "@azure/storage-blob";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
    name: 'Photo',
    methods: {
        closeLightbox() {
            this.$router.push('/');
        }
    },
    setup(props) {
        const route = useRoute();
        const account = process.env.VUE_APP_STORAGE_ACCOUNT
        const sasToken = process.env.VUE_APP_STORAGE_SAS
        const imageContainer = process.env.VUE_APP_STORAGE_IMAGES_CONTAINER
        const blobServiceClient = ref({} as BlobServiceClient)
        const imageContainerClient = ref()

        const chosenImage = ref({} as Image)
        
        onMounted(async () => {
            if (!route.params.name) alert('props.name nono')
            if (!imageContainer) {
                alert('Please make sure you have set the correct Azure Storage credentials in the .env file');
                return;
            }

            blobServiceClient.value = new BlobServiceClient(`https://${account}.blob.core.windows.net/?${sasToken}`)
            imageContainerClient.value = blobServiceClient.value.getContainerClient(imageContainer);  // create a image containerClient
            
            const tempBlockBlobClient = imageContainerClient.value.getBlockBlobClient(route.params.name);
            chosenImage.value = { name: route.params.name, url: tempBlockBlobClient.url } as Image
        })        

        return {
            chosenImage
        }
    }
})