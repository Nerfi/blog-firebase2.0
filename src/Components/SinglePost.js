import React, {useEffect, useState, useContext} from 'react';
import firebase from '../firebase/firebase';
import './SinglePost.css';
import {AuthContext} from './UserContext/AuthContext';

const SinglePost = (props) => {

  const [selectedPost, setSelected] = useState({});
  const [error, setError] = useState(null);

  //adding state for comments
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);


  //desestructurando select post object
  const {likes} = selectedPost;

  //user context
  const {displayName, uid} = useContext(AuthContext);


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

    //fetching the comments for each posts

    const fetchComments = async () => {

        await firebase.firestore()
            .collection('posts')
            .doc(props.match.params.id)
            .collection('comments')
            .onSnapshot(snapShot => {
             // setComments(snapShot.docs.map(doc) => doc.data() )
              setComments(snapShot.docs.map(doc => doc.data()))

            })
    };



  useEffect(() => {

    //calling the funciton, always
    fetchSelected();
    //calling the comments function
    fetchComments();

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
      text: comment,
      user: displayName,
      userUid: uid
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

    <div className="singlePost__comments">

        {comments.map(comment => {

          return (
            <ul  key={comment.text}>
              <li>
                <p> <strong>{comment.user}</strong> {comment.text}</p>

              </li>

            </ul>
          )
        })}

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
