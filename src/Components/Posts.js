import React, {useState,useEffect} from 'react';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';
import './Posts.css';

 const Posts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {

    const fetchPosts = async () => {

      const datastore = await firebase.firestore().collection("posts")

        datastore.get().then((snapShot) => {

          const newArray = [];

          snapShot.forEach((doc) => {
            newArray.push({ id: doc.id, ...doc.data() })
          })

          setPosts(newArray);
        })
    };

    //calling the function, always call it !
    fetchPosts();

  },[]);


  return <div className="posts__container">

  {
    posts.map(posts => {
    return <CardComponent data={posts} key={posts.id}/>
  })
}

  </div>
 };


 export default Posts;
