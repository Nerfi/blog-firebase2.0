import React, {useState, useEffect} from  'react';
import firebase from '../firebase/firebase';

const EditPost = (props) => {
  //search on how to update the img for storage firestore
  //por ahora para ahorrar tiempo voy a crear la misma forma que en create post de fomra manual, despues lo voy a tener que refactorizar y crear un solo elemento(form) para reusarlo

  const [values, setValues] = useState({title: '',content: '', value: ''});

  const [editPost, setEdit] = useState({});
  const [error, setError] = useState(null);

  //gloabl variables
  const {title, content, value} = values;


  useEffect(() => {

    const fetchEditPost = async () => {

      await firebase.firestore().collection('posts')
            .doc(props.match.params.id)
            .get()
            .then(result => setEdit(result.data()))
            .catch(err => setError(err.message))

    };

    //calling the function
    fetchEditPost();

  },[]);

  const handleChange = (e) => {

    let name = e.target.name;
    let value = e.target.value;

      setValues(prev => {
        return {
          ...prev,
          [name]: value
        }
      })

  };

  const handleUploadPost = () => alert('addiong')

  const handleCategory = () => alert('addiong')

  return <div className="editPost__container">

      <form onSubmit={handleUploadPost}>

       <div className="form_control">

        <label>{editPost.title}</label>

          <input type="text"
           className="form-control"
           placeholder="Enter title"
           name="title"
           onChange={handleChange}
           value={title}
           required
           />

       </div>

            <label>{editPost.content}</label>

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



         <select  onChange={handleCategory} required>
          <option value="News">News</option>
          <option value="Travel">Travel</option>
          <option value="Health">Health</option>
          <option value="Tech">Tech</option>
        </select>

        <button type="submit" className="btn_create">editPost</button>


      </form>
  </div>
};

export default EditPost;
