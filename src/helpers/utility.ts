import { useToast } from 'vue-toastification';
const toast = useToast();

export const handleServerValidationErrors = (formKeys: Array<any>, errors: any) => {
    for(const key of formKeys) {
        if(key in errors) {
          toast.error(errors?.[key][0]);
          break;
        }
    }
}