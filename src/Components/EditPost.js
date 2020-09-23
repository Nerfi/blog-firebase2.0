import React, {useState, useEffect} from  'react';
import firebase from '../firebase/firebase';
import Form from './UI/Form';
import './EditPost.css';

const EditPost = (props) => {

  const [editPost, setEdit] = useState({});
  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchEditPost = async () => {

      await firebase.firestore().collection('posts')
            .doc(props.match.params.id)
            .get()
            .then(result => setEdit(result.data()))
            .catch(err => setError(err.message))

    };

    //calling the function
    fetchEditPost();

  },[]);

  //need to create the action in order to update the post




  return <div className="editPost__container">

    <Form

      editData={editPost}
      action="edit"

    />


  </div>
};

export default EditPost;

