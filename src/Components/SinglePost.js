import React, {useEffect, useState} from 'react';
import firebase from '../firebase/firebase';

const SinglePost = () => {

  const [selectedPost, setSelected] = useState({});

  useEffect(() => {

    const fetchSelected = async () =>  {

    };

    //calling the funciton, always

    fetchSelected();

  },[selectedPost]);

  return <h1>working</h1>
};

export default SinglePost;
