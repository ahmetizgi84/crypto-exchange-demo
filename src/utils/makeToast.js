import { notification } from 'antd';


export function makeToast(type, message) {
    notification[type]({
        message: type,
        description: message
    });
};