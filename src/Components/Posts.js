import React, {useState,useEffect} from 'react';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';
import './Posts.css';
import {Nav} from 'react-bootstrap';

 const Posts = (props) => {

  const [posts, setPosts] = useState([]);

//creando la string para pasarsela como parametro a la funcion
  const [selectCategory, setSelected] = useState("");
  const [retrieveData, setRetrieve] = useState([]);// aqui voy a guardar los values que me devuelva la llamada a la API


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



  //new intento, almost working
useEffect(() => {

    const fetchPopularPosts = async () => {

      let postsBack = [];

      await firebase.firestore()
        .collection('posts')
        .where("value", "==",selectCategory)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            postsBack.push({ id: doc.id, ...doc.data() })
          })
          setRetrieve(postsBack);
        })
        .catch(error => setError(error.message))
    };

    //calling the function
    fetchPopularPosts();

  }, [selectCategory]);

  console.log(retrieveData, 'data retrieve')


  return <>

    <div className="posts__category">

      <Nav className="justify-content-center"   onSelect={(eventKey) => setSelected(eventKey)} >
        <Nav.Item >
          <Nav.Link  eventKey="Tech" >Tech</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="News">News</Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link  eventKey="Health">Health</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  eventKey="Travel" >
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
