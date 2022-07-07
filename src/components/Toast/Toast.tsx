import  { useEffect, useState } from 'react';
import './Toast.css';

interface ToastProps {
    toastId: number;
    position: string;
    handlDelete: () => void;
}
interface toastData {
    id: number;
    title: string;
    description: string;
    backgroundColor: string,
}

const Toast = (props: ToastProps) => {
    const [toastList] = useState<toastData[]>([{
        id: 1,
        title: 'Success',
        description: 'This is a success toast component',
        backgroundColor: '#5cb85c',
    },
    {
        id: 2,
        title: 'Danger',
        description: 'This is an error toast component',
        backgroundColor: '#d9534f',
    },
    ])
    const [toast, setToast] = useState<toastData>();

    const handleDelete = () => {
        props.handlDelete();
    }


    useEffect(() => {
        setToast(toastList[props.toastId])
    }, [toastList,props.toastId]);

    return (
        <>
            {toast !== undefined
                ?
                <div className={`notification-container ${props.position}`}>
                    <div
                        className={`notification-toast ${props.position}`}
                        style={{ backgroundColor: toast.backgroundColor }}
                    >
                        <button className="button-toast" onClick={handleDelete}>
                            X
                        </button>
                        <div>
                            <p className="notification-title">{toast.title}</p>
                            <p className="notification-message">
                                {toast.description}
                            </p>
                        </div>
                    </div>
                </div>
                :
                <></>
            }
        </>
    )
}

export default Toast;