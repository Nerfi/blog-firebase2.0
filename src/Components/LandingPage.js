import React, {useState, useEffect} from 'react';
import './LandingPage.css';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';


const LandingPage = () => {

  const [popular, setPopular] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchPopularPosts = async () => {

      let postsBack = [];

      await firebase.firestore()
        .collection('posts')
        .where("likes", ">=", 5)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            postsBack.push({ id: doc.id, ...doc.data() })
          })
          setPopular(postsBack);
        })
        .catch(error => setError(error.message))
    };

    //calling the function
    fetchPopularPosts();

  }, []);

  return (
    <>
    <div className="landing__page">

    <div className="landing__text">
      <h1>Grab experiences, share memories! </h1>
    </div>

    </div>

     <div className="landingPage__banner">
        <h2>Most popular blogs on the site </h2>
     </div>

    <div className="landingPage__cards">

      {popular.map(post => {
        return <CardComponent data={post} key={post.id}/>
      })}



    </div>

    </>


  );
}

export default LandingPage;
