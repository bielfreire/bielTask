import Toast from 'react-native-toast-message';
import { statusToastType } from '../screens/Tasks/interfaces';

export function useCallToast() {

  function sendToast(status: statusToastType, message: string) {
    Toast.show({
      text1: `${message}`,
      type: status,
      position: 'top',
    });
  }

  return {sendToast}
}

