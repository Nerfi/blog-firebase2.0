import React, {useState,useEffect} from 'react';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';

 const Posts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //making api call to firebase in order to retrieve the data I want to
    const fetchPosts = async () => {

      const pop = [];

    await firebase
    .firestore()
    .collection("posts")
    .get()
    .then(snapShot => {

      snapShot.forEach(doc => {
        /*console.log(doc.id, doc.data());*/

        pop.push({ id: doc.id, ...doc.data() } )

        setPosts(pop);

      })
    })


    };

    fetchPosts();



  },[]);

    console.log(posts, "posts array")





  return <div className="posts__container">


    <CardComponent/>

  </div>
 };


 export default Posts;
