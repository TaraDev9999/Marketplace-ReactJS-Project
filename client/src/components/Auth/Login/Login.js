import { useState, useContext } from 'react';
import { Context } from '../../../ContextStore';
import { loginUser } from '../../../services/authService'
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleSider from '../../Siders/SimpleSider';
import '../auth.css';

function Login({ history }) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const {userData, setUserData} = useContext(Context)

    const handleChanges = (e) => {
        e.preventDefault();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        loginUser(user)
            .then(res => {
                if (!res.error) {
                    setUserData(res.user)
                    history.push('/')
                } else {
                    setLoading(false);
                    console.log(res.error)
                }
            })
    }

    return (
        <>
            <SimpleSider />
            <div className="container auth-form">
                <h1 className="auth-heading">Sign In</h1>
                <Form className="col-lg-6" onSubmit={handleSubmitLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChanges} required />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChanges} required />
                    </Form.Group>
                    {loading ?
                        <Button className="col-lg-12 btnAuth" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button variant="dark" className="col-lg-12 btnAuth" type="submit">Sign In</Button>
                    }
                    <p className="bottom-msg-paragraph">Don't have an account? <Link to="/auth/register">Sign Up</Link>!</p>
                </Form>
            </div>
        </>
    )
}

export default Login;