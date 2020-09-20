import React, {useEffect, useState} from 'react';
import firebase from '../firebase/firebase';
import './SinglePost.css';

const SinglePost = (props) => {

  const [selectedPost, setSelected] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchSelected = async () =>  {

      await firebase.firestore().collection("posts")
          .doc(props.match.params.id)
          .get()
          .then(doc => {
             if(doc.exists) setSelected(doc.data())
          })
          .catch(error => {
            setError(error.message);
          })

    };

    //calling the funciton, always
    fetchSelected();

  },[props.match.params.id]);



  return <div className="singlePost__container">
    <div className="singlePost__title">

      <h1>{selectedPost.title}</h1>

    </div>

    <img src={selectedPost.imgUrl} alt="select post" className="singlePost__img"/>


    <div className="singlePost__content">
      <p> {selectedPost.content}</p>
    </div>

    <div className="singlePost__data">

    <div className="something"> {selectedPost.value} </div>

    <div className="something2">
     <i class="fa fa-heart"> </i>
      {selectedPost.likes === 0 ? "Be the firs to like the post" : selectedPost.likes}


    </div>

    </div>


  </div>
};

export default SinglePost;
