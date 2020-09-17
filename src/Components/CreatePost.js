import React, {useState} from 'react';
import './CreatePost.css';
//importing storage in order to upload a imgae to firebase
import { storage }  from '../../src/firebase/firebase';

const CreatePost = () => {

 const [details, setDetails] = useState({
    title: '',
    content: '',
    likes: 0
 });

//adding state in order to upload an img
const allImputs = {imgUrl: ''};
const [imageAsFile, setImageAsFile] = useState('');
const [imageAsUrl, setImageAsUrl] = useState(allImputs);


 //select element state
 const [category, setCategory] = useState({value: ''});

 //global variables
 const {title, content} = details;

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

    e.preventDefault();
    console.log('start upload');

    //error handlign
    if (imageAsFile ===  '') {
      console.log(' not a single imgae was upload, can be null or underfined');
    };

    //starting the upload process and also creating the path /images in firestore
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);

    //initializing firebase uploading
    uploadTask.on('state_change', (snapShot) => {
      //takes an snapShot of the process as it is happening, uploading basically
      console.log(snapShot)
    }, (err) => {
        setError(err);

    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
          storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then(firebaseUrl => {
            setImageAsUrl(prevObject => ({...prevObject, imgUrl: firebaseUrl}))
          })

    })


  };


  return(
    <>

    <div className="banner">
    <h2>Share with us your history !</h2>
    </div>

    <div className="create__form">

      <form onSubmit={"esta funcion no esta aun creada, esa hace la POST reque to firebase"}>

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
