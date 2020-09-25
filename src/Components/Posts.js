import React, {useState,useEffect} from 'react';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';
import './Posts.css';
import {Nav} from 'react-bootstrap';

 const Posts = (props) => {

  const [posts, setPosts] = useState([]);

  //change this later becuase I have change to from null to []
  //in order to test another query on the API call, nothing working
  const [selectCategory, setSelected] = useState([]);

  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchPosts = async () => {

       await firebase.firestore().collection("posts")

        .get().then((snapShot) => {

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


  //creando fllamada a firebase db fake and fast in order to check the data
  //is the one I want

  useEffect(() => {

      const fetchCategory = async () => {
        const postCategory = [];


      await firebase.firestore()
        .collection('posts')
        .where("title", "==", "Vamos a ver si se mantiene")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log({doc})
            postCategory.push( ...doc.data() )
          })
          setSelected(postCategory);
        })
        .catch(error => setError(error.message))
      }

      fetchCategory();


  },[]);


  console.log(typeof(selectCategory) , ' data selectCategory')


  return <>

    <div className="posts__category">

      <Nav className="justify-content-center"  activeKey={selectCategory} onSelect={(eventKey) => setSelected(eventKey)} >
        <Nav.Item>
          <Nav.Link  eventKey="tech" >Tech</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="news">News</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="health">Health</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="travel" >
            Travel
          </Nav.Link>
        </Nav.Item>
  </Nav>

    </div>

   <div className="posts__container">
      {
        posts.map(posts => {
        return <CardComponent data={posts} key={posts.id} />
      })
    }
</div>

  </>
 };


 export default Posts;
