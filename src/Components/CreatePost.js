import React, {useState, useContext} from 'react';
import './CreatePost.css';
import firebase from '../../src/firebase/firebase';
//importing the context we created earlier
import {AuthContext} from './UserContext/AuthContext';
//importing the form component lets see
import Form from './UI/Form';

const CreatePost = ({history}) => {

 //using the context
 const user = useContext(AuthContext)

 //error state
 const [error, setError] = useState(null);

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
        currentUser: currentUser
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

