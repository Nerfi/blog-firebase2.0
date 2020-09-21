import React, {useEffect, useState} from 'react';
import firebase from '../firebase/firebase';
import './SinglePost.css';

const SinglePost = (props) => {

  const [selectedPost, setSelected] = useState({});
  const [error, setError] = useState(null);

  //adding state for comments
  const [comment, setComment] = useState('');

  //not sure if I'll have to add and state in order to hold the likes count

  //desestructurando select post object
  const {likes} = selectedPost;

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



  const addLikes = async () => {
    //add likes action is kinda of upadte/patch request
    await firebase
          .firestore()
          .collection("posts")
          .doc(props.match.params.id)
          .update({likes: likes + 1})
          .then(() => {
            setSelected({...selectedPost, likes: likes + 1})
          })
          .catch(error => {
            setError(error.message)
          })
  };



  //adding locig in order to post a comment

  const postComment = (e) => {
    e.preventDefault();
    //get into the specific post and add a new collection in order to render and have several comments for a specific post!
    firebase.firestore().collection('posts').doc(props.match.params.id).collection('comments').add({
      text: comment
    })

    //cleaning the state
    setComment('');
  }

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

       <i className="fa fa-heart" onClick={addLikes} >
        {selectedPost.likes === 0 ? "Be the firs to like the post" : selectedPost.likes}
       </i>


    </div>

    </div>

    <form>

      <input
      className="post__input"
      type="text"
      placeholder="Add a comment..."
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      />

      <button
      className="button__input"
      disabled={!comment}
      type="submit"
      onClick={postComment}
      >
      Post
      </button>
    </form>


  </div>
};

export default SinglePost;
