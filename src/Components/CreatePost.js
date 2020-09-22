import React, {useState, useContext} from 'react';
import './CreatePost.css';
//importing storage in order to upload a imgae to firebase
import { storage }  from '../../src/firebase/firebase';
import firebase from '../../src/firebase/firebase';
//importing the context we created earlier
import {AuthContext} from './UserContext/AuthContext';

//importing the form component lets see
import Form from './UI/Form';

const CreatePost = ({history}) => {

 //using the context
 const user = useContext(AuthContext)

//adding state in order to upload an img
const [file, setFile] = useState("");
//const [url, setURL] = useState("");



 //error state
 const [error, setError] = useState(null);

  //creating onSubmit fucntion to upload a whole doc to firebase

  const handleUploadPost = async (title, likes,content,value,url, currentUser) => {


    if(user && url) {
     await firebase
      .firestore()
      .collection("posts")
      .add({
        title,
        likes,
        content,
        value,
        imgUrl: url,
        currentUser: currentUser //he cambiado este value, antes era :user.uid, ahora es currenUser

      })
      .then(() => {
        history.push("/");
      })
      .catch(err => {
        setError(err.message);
      })
    }

  };


  return(
    <>

    <div className="banner">
    <h2>Share with us your history !</h2>
    </div>



    <div className="create__form">

     <Form
      upload={handleUploadPost}
      mistake={error}
     />


    </div>

    </>


  );
}

export default CreatePost;

