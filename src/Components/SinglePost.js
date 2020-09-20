import React, {useEffect, useState} from 'react';
import firebase from '../firebase/firebase';
import './SinglePost.css';

const SinglePost = (props) => {

  const [selectedPost, setSelected] = useState({});
  const [error, setError] = useState(null);
  //not sure if I'll have to add and state in order to hold the likes count

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

  //for testing porpuses, it's working
  const addLikes = () => alert('working')



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

       <i class="fa fa-heart" onClick={addLikes} >
        {selectedPost.likes === 0 ? "Be the firs to like the post" : selectedPost.likes}
       </i>


    </div>

    </div>


  </div>
};

export default SinglePost;
