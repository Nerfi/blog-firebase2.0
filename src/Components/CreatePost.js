import React, {useState, useContext} from 'react';
import './CreatePost.css';
//importing storage in order to upload a imgae to firebase
import { storage }  from '../../src/firebase/firebase';
import firebase from '../../src/firebase/firebase';
//importing the context we created earlier
import {AuthContext} from './UserContext/AuthContext';

const CreatePost = ({history}) => {

 const [details, setDetails] = useState({
    title: '',
    content: '',
    likes: 0
 });

 //using the context
 const user = useContext(AuthContext)

//adding state in order to upload an img
const [file, setFile] = useState(null);
const [url, setURL] = useState("");


 //select element state
 const [category, setCategory] = useState({value: ''});

 //global variables
 const {title, content,likes} = details;
 const {imgUrl} = imageAsUrl;

 //error state
 const [error, setError] = useState(null);


  const handleChange = (e) => {

    //working mwith multiple inputs
    const name = e.target.name
    const value = e.target.value;

    setDetails(prevValues => {
      return {
        ...prevValues,
        [name]: value
      }
    })

    console.log({
      name, value
    })


  };

  //handling select category state change

  const handleCategory = e => setCategory({value: e.target.value});

  //handling img upload, onChange listener
  const handleImgUpload = e => {
    const image = e.target.files[0]; //taking the first image we upload, just the first
    setImageAsFile(imageFile => (image));
  };

  //managing the upload of an img, I'll call this function in the main one that I use to upload the whole , in this case post, to firebase
  const handleFirebaseUpload = e => {


    console.log('start upload');

    //error handlign
    if (imageAsFile ===  '') {
      console.log(' not a single imgae was upload, can be null or underfined');
    };

    //starting the upload process and also creating the path /images in firestore
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

    //initializing firebase uploading
    uploadTask.on('state_changed', (snapShot) => {
      //takes an snapShot of the process as it is happening, uploading basically
      console.log(snapShot)
    }, (err) => {
        setError(err.message);

    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then(firebaseUrl => {
            setImageAsUrl(prevObject => ({...prevObject, imgUrl: firebaseUrl}))
          })
          .catch(err => {
            setError(err.message);
          })

    })


  };

  //creating onSubmit fucntion to upload a whole doc to firebase

  const handleUploadPost = async (e) => {

    e.preventDefault();

    if(user) {
     await firebase
      .firestore()
      .collection("posts")
      .add({
        title,
        likes,
        content,
        imgUrl: imgUrl,
        currentUser: user.uid

      })
      .then(() => {
        history.push("/");
      })
      .catch(err => {
        setError(err.message);
      })
    }

    //calling function to upload img to storage
    handleFirebaseUpload();




  };


  return(
    <>

    <div className="banner">
    <h2>Share with us your history !</h2>
    </div>

      <p>{error && error}</p>

    <div className="create__form">

      <form onSubmit={handleUploadPost}>

       <div className="form_control">

        <label>Title</label>

          <input type="text"
           className="form-control"
           placeholder="Enter title"
           name="title"
           onChange={handleChange}
           value={title}
           required
           />

       </div>

            <label>Content</label>

        <div className="form-group">
          <textarea
           name="content"
           cols="40"
           rows="6"
           onChange={handleChange}
           value={content}
           placeholder="Write your history"
           required
           />

        </div>

        <input
        type="file"
        onChange={handleImgUpload}
        required
         />

         <select  onChange={handleCategory} required>
          <option value="News">News</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Tech">Tech</option>
        </select>

        <button type="submit" className="btn_create">Add Post</button>


      </form>
    </div>

    </>


  );
}

export default CreatePost;
