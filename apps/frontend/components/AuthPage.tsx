
export default function AuthPage({isSignIn}
    :{isSignIn:boolean}
){
    return <div className="flex items-center">

        <div>
        <div>
            <label >Username</label>
            <input placeholder="Enter your username"/>
        </div>
        <div>
            <label >password</label>
            <input placeholder="Enter your password"/>
        </div>
        <button >{isSignIn?"Sign In":"Sign Up"}</button>
        </div>
    </div>

}