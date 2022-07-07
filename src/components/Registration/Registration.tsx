import React, { FC, useEffect, useState } from "react";
import "./Registration.css";

interface Props {
    handleSubmit: (username: string, password: string) => void;
    handleClick: () => void;

}

const Registration: FC<Props> = (props: Props) => {
    const [username, setUsername] = useState<string>('');
    const [match, setMatch] = useState<boolean>(false);
    const [password, setPassword] = useState({
        firstPassword: '',
        secondPassword: ''
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (match === true) {
            alert("Registered!");
            props.handleSubmit(username, password.firstPassword);
        }
        else {
            alert("Passwords don't match!");
        }
    }

    const handleClick = () => {
        props.handleClick();
    }

    const changeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const { value, name } = event.target;
        setPassword({ ...password, [name]: value })
    }

    useEffect(() => {
        setMatch(!!password.firstPassword && password.firstPassword === password.secondPassword);
    }, [username, password]);

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="register" onSubmit={handleSubmit}>
                        <div className="register__field">
                            <input type="text" className="register__input" onChange={changeUsername} placeholder="Enter Username" id="username" required />
                        </div>
                        <div className="register__field">
                            <input type="password" className="register__input" onChange={inputChange} placeholder="Enter Password" name="firstPassword" id="psw" required />
                        </div>
                        <div className="register__field">
                            <input type="password" className="register__input" onChange={inputChange} placeholder="Repeat Password" name="secondPassword" id="psw-repeat" required />
                        </div>
                        <div className="register_buttons">
                            <button className="button register__submit" type="submit">
                                Register
                            </button>
                            <button className="button register__submit" onClick={handleClick}>
                                Back
                            </button>
                        </div>

                    </form>

                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>

    );
}

export default Registration;