import React, { useState, useEffect } from 'react'
import { auth} from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const ForgotPassword = ({history}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) history.push('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_REGISTER_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail('');
            setLoading(false);
            toast.success(`Please check ${email} for password reset link`);
        })
        .catch((error) => {
            toast.error(error.message);
            setLoading(false);
            
            
        });

    }
    return (
        <div className='container col-md6 offset-md-3 p-5'>
            {loading ? <h4 className='text-danger'>Loading</h4> : <h4>Forgot Password</h4>}
            <form onSubmit={handleSubmit}>
                <input 
                type='email' 
                className='form-control' 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Type your email'
                autoFocus
                 />
                 <br />
                 <button className='btn btn-raised' disabled={!email}>
                     Submit
                 </button>
            </form>
        </div>
    )
}

export default ForgotPassword
