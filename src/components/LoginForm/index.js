import { useState } from 'react'
import './index.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")
    const [_, setCookie] = useCookies(["user_id"])
    const navigate = useNavigate()

    const onSubmitSuccess = get_user_id => {
        setErr(false)
        setErrMsg("")
        setCookie("user_id", get_user_id[0].id);
        if(get_user_id[0].id !== 3){
            navigate("/user-dashboard")
        } else {
            navigate("/admin-dashboard")
        }

    }

    const onSubmitFailure = err => {
        setErr(true)
        setErrMsg("Invalid Credentials")
    }

    const handleLogin = async event => {
        event.preventDefault()
        if (email === "") {
            setErr(true)
            setErrMsg("Enter E-mail")
            return
        } else if (password === "") {
            setErr(true)
            setErrMsg("Enter Password")
            return
        } 
        const url = "https://bursting-gelding-24.hasura.app/api/rest/get-user-id"
        const userDetails = { email, password }
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-hasura-admin-secret': 'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF'
                
            },
            body: JSON.stringify(userDetails)
        }
        try {
            const response = await fetch(url, options)
             console.log(response)
            if (response.ok === true) {
                const data = await response.json();
                onSubmitSuccess(data.get_user_id)
            } else {
                onSubmitFailure(response.data)
            }
        } catch (error) {
            //console.error(error)
            setErr(true)
            setErrMsg("Invalid Credentials")
        }

    }

    return (
        <div className="container">
            <div className="loginContainerMain">  
                <img
                    src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Frame_507_ogpjs9.png"
                    alt="website logo"
                    className="log-logo"
                   />
                    <form className="loginFormContainer" onSubmit={handleLogin}>
                        <div >
                            <div className="inputFormContainer">
                                <label className="loginFormName" htmlFor='email'>E-mail</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id='email' className="loginFormInput" placeholder='E-mail' />
                            </div>
                            <div className="inputFormContainer">
                                <label className="loginFormName" htmlFor='password'>Password</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="loginFormInput" placeholder='Password' />
                                {err && (<p className="errorMsg">*{errMsg}</p>)}
                            </div>
                            <button type="submit" className="sign-in-btn">Sign In</button>
                        </div>
                    </form>
               
            </div>
        </div>
    )
}

export default LoginForm