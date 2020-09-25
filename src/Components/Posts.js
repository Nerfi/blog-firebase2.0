import React, {useState,useEffect} from 'react';
import firebase from '../firebase/firebase';
import CardComponent from './UI/Card';
import './Posts.css';
import {Nav} from 'react-bootstrap';

 const Posts = (props) => {

  const [posts, setPosts] = useState([]);

  const [selectCategory, setSelected] = useState();


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

  console.log(selectCategory, 'selectCategory')


  return <>

    <div className="posts__category">

      <Nav className="justify-content-center" activeKey="/home"  onSelect={(eventKey) => alert(`selected ${eventKey}`)} >
        <Nav.Item>
          <Nav.Link>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={(e) => setSelected(e.target.value)}>Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Link</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" >
            Disabled
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
