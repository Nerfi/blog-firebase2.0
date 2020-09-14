import React, {useState} from 'react';
import './CreatePost.css';

const CreatePost = () => {

 const [details, setDetails] = useState({
    title: '',
    content: '',
    likes: 0
 });
 //select element state
 const [category, setCategory] = useState({value: ''});


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

  const handleCategory = (e) =>  {
    setCategory({value: e.target.value})

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
           placeholder="Write your history"
           required
           />

        </div>

        <input
        type="file"
        onChange={""}
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
