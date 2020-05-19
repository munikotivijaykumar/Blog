import React ,{useState,useEffect} from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
const Markdown = require('react-markdown');
export default function Blogpage(props) {
    const [content, setContent] = useState("");
    const [postId , setPostId] = useState("");
    const [isSpinner,setSpinner] =useState(true);
    // const [postName , setPostName] = useState("");
    const location = useLocation();
    const history = useHistory();
    const getContent = async(e)=>{
        // e.persist();
        // console.log(postId)
        try{
        const response = await fetch('/api/admin/blog/post' , {
            method: "POST",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json"

            },
            mode:"cors",
            body :JSON.stringify({postId:location.pathname.split("/")[2]})
        })
    
        const data = await response.json();
        // console.log(data.data)
        if (data.error === false) {
            setContent(data.data.content)
          } else {
            alert("error..!");
            props.history.push("/admin/dashboard");
          }
          // console.log(data.data)
        }catch(err){
          alert("error..!");
          props.history.push("/admin/dashboard");
        }

    }

    useEffect(()=>{

        const aboutController = new AbortController()
        try {
            
            setPostId(location.pathname.split("/")[2]);
            getContent();
            setSpinner(false)
        } catch (error) {
            history.push("/")
        }

        return ()=>aboutController.abort()
    },[])
    if (isSpinner) {
        return (
        <div className="d-flex justify-content-center " >
            <div className="spinner-border" role="status" id="spinner">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        )
    }else{
    return (
        <>
        <Header />
    <div className="jumbotron" style={{backgroundColor:"transparent"}}>

        <Markdown source={content} escapeHtml={false} />
    </div>
    <Footer/>
    </>
    )
  }
}