import React ,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import "./../App.css";
function Login(props){
  const abortController = new AbortController()
  const [userData, setUserData] = useState({});
  const [errMessage, setErrMessage] = useState("");
  const [isSpinner,setSpinner] =useState(true);
  const [isSpinner1,setSpinner1] =useState(false);
  const userlog= async ()=>{

    try{
    const resp = await fetch("/api/admin/auth/verfiy",{signal:abortController.signal});
    const data = await resp.json();
    // console.log(data)
         if(data.success === true){
            props.history.push("/admin/dashboard");
         }
    }catch(e){
        console.log(e);
        props.history.push("/admin/login");
        
    }
    }

    useEffect(()=>{
        
        // console.log("sssss")
        userlog();
        setSpinner(false)

        return ()=> abortController.abort()
    },[])

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    //console.log("vijay")
  };

  const handleSubmit = async (e) => {

    try{
    if( !userData.email ||! userData.password ){

      setErrMessage("fill the details")
    }else{
    const userdata = {
     
      email : userData.email,
      password: userData.password
    };
 
    setSpinner1(true)
    e.persist();
    const response = await fetch('/api/admin/auth/login' , {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"

    },
    mode:"cors",
    body :JSON.stringify(userdata)
  })
  const data = await response.json();
  // console.log(data)
  if (data.error === false) {
   
    // console.log(data.success)
     props.history.push("/admin/dashboard");
     setSpinner1(false)
    //return <Redirect to="/Dashboard" />
    
  }else{setSpinner1(false) ;setErrMessage("internal Error...!") }

    }
  }catch(e){setSpinner1(false) ;
     setErrMessage("Internal Error...")
     console.log(e)
    }
  }
  const sp1 =  <button className="btn btn-success " type="button" disabled>
  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Loading...
</button>

const sp =  <input type="button" name="register"  value={isSpinner1 ? sp1 :"Login"} className="btn btn-success " onClick={handleSubmit} />
    if (isSpinner) {
      return (
        <div className="d-flex justify-content-center " >
            <div className="spinner-border" role="status" id="spinner">
                <span className="sr-only">Loading...</span>
            </div>
        </div> 
      )
  }else{
    return(
        
        <div className="App ">
        <h3>Login</h3><br />
        
        <table className="login"  onChange={handleChange} >
        <tbody>
        <tr>
        <td><p>Email  : </p></td><td><input type="text" name="email" /></td>
        </tr>
        <tr>
        <td><p>Password  : </p></td><td><input type="password" name="password" /></td>
        </tr>
        <tr>
        <td colSpan="2"><p >{isSpinner1 ? sp1 :sp }</p></td>
        </tr>
        </tbody>
        </table>
        
  
            <br />
        <Link to="/admin/register">
          <p >Register.</p>
        </Link>

        <p style={{color:'red'}}>{errMessage}</p>
        </div>
    )

    }
}

export default Login;