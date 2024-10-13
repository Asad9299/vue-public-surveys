import { useToast } from 'vue-toastification';
const toast = useToast();

export const handleServerValidationErrors = (formKeys: Array<any>, errors: any) => {
    for(const key of formKeys) {
      
      if (key.startsWith('questions')) {
        Object.values(errors).forEach((message:any) => {
          toast.error(message[0]);
        });
      }

      if(key in errors) {
          toast.error(errors?.[key][0]);
          break;
        }
    }
}

export const getFullImageURL = (image: string | undefined): string => {
  return image ? import.meta.env.VITE_BASE_URL+image: "https://flowbite.com/docs/images/examples/image-1@2x.jpg";
}