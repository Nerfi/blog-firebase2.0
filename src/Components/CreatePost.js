import React, {useState} from 'react';
import './CreatePost.css';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');


  return(
    <>

    <div className="banner">
    <h2>Share with us your history !</h2>
    </div>

    <div className="create__form">




      <form onSubmit={""}>

       <div className="form_control">

        <label>Title</label>

          <input type="text"
           className="form-control"
           placeholder="Enter title"
           name="title"
           onChange={""}
           required
           />

       </div>

        <div className="form-group">

          <label >Content</label>

          <input
          type="content"
          className="form-control"
          required
          placeholder="Write your history"
          name="content"
          onChange={""}
          />

        </div>

        <input
        type="file"
        onChange={""}
        required
         />

         <select  onChange={""} required>
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
