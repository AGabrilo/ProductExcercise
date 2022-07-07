import React, { useEffect, useState } from "react";
import Registration from "../Registration/Registration";
import Toast from "../Toast/Toast";
import "./Login.css";
interface Check {
    signIn: () => void;
}

interface Data {
    username: string;
    password: string;
}


function Login(props: Check) {
    const [users, setUsers] = useState<Data[]>([{ username: 'Lisa', password: '1234' }]);
    const [user, setUser] = useState<Data>({ username: '', password: '' });
    const [contains, setContains] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);
    const [toastId, setToastId] = useState<number>();


    const showToast = (x: number) => {
        setToastId(x);
    }

    const handlDelete = () => {
        setToastId(undefined);
    }

    const containsObject = (obj: Data, list: Data[]) => {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].username === obj.username && list[i].password === obj.password) {
                return true;
            }
        }
        return false;
    }

    const onSign = () => {
        if (contains === true) {
            showToast(0);
            setTimeout(props.signIn, 1000);
        }
        else {
            showToast(1);
        }
    }

    const handleSubmit = (u: string, p: string) => {
        setUsers(users => ([...users, { username: u, password: p }]));
    };

    const handleClick = () => {
        if (change === true) {
            setChange(false);
        }
        else {
            setChange(true);
        }
    };

    const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const { value, name } = event.target;
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        setContains(containsObject(user, users));
    }, [users, user]);

    return (
        <div>
            {!change
                ?
                <div className="container">
                    <div className="screen">
                        <div className="screen__content">
                            <form className="login">
                                <div className="login__field">
                                    <input type="text" className="login__input" onChange={inputChange} placeholder="Username" name="username" />
                                </div>
                                <div className="login__field">
                                    <input type="password" className="login__input" onChange={inputChange} placeholder="Password" name="password" />
                                </div>
                                <button className="button login__submit" type="button" onClick={onSign}>
                                    <span className="button__text">Log In Now</span>
                                </button>
                                <button className="button login__submit" onClick={handleClick}>
                                    Register
                                </button>
                            </form>
                            {toastId != null
                                ?
                                <Toast
                                    toastId={toastId}
                                    handlDelete={handlDelete}
                                    position="bottom-right"
                                />
                                :
                                <></>
                            }

                        </div>
                        <div className="screen__background">
                            <span className="screen__background__shape screen__background__shape4"></span>
                            <span className="screen__background__shape screen__background__shape3"></span>
                            <span className="screen__background__shape screen__background__shape2"></span>
                            <span className="screen__background__shape screen__background__shape1"></span>
                        </div>

                    </div>
                </div>
                :
                <Registration handleSubmit={handleSubmit} handleClick={handleClick} />

            }
        </div>

    );
}
export default Login;