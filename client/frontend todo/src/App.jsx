import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdAutoDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';

const App = () => {

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [setEditId, setIsEditing] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/todos')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleForm = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3000/todos', {name, title})
    .then((res)=>{
      setData([...data, res.data])
      setName('')
      setTitle('')
    }).catch((err)=>{
      console.log( "get data error",err);
    })
 
  }






//   const handleDelete = (index) => {
//   const id = data[index]._id;
//   axios.delete(`http://localhost:3000/todos/${id}`)
//     .then((res) => {
//       setData(data.filter((item) => item._id !== id));
//     })
//     .catch((err) => {
//       console.log("Delete error", err);
//     });
// }



const handleDelete = (index) => {
  console.log(data[index]._id);
  const id = data[index]._id;
  axios.delete(`http://localhost:3000/todos/${id}`)
    .then((res) => {
      const updatedData = [...data];
      updatedData.splice(index, 1);
      setData(updatedData);
    })
    .catch((err) => {
      console.log("Delete error", err);
    });
}




const handleEdit = (index) => {
  const id = data[index]._id;
  const currentName = data[index].name;
  const currentTitle = data[index].title;

  // Prompt user for new name and title
  const newName = prompt("Enter new name:", currentName);
  const newTitle = prompt("Enter new title:", currentTitle);

  // Only proceed if user entered values
  if (newName !== null && newTitle !== null) {
    axios.put(`http://localhost:3000/todos/${id}`, { name: newName, title: newTitle })
      .then((res) => {
        const updatedData = [...data];
        updatedData[index] = res.data; // Update the item in the array
        setData(updatedData); // Update state with new data
      })
      .catch((err) => {
        console.log("Update error", err);
      });
  }
};






  return (
    <>
      <div className='text-center font-bold mt-5 text-xl'>Backend Todo</div>

      <div className=''>
        <form onSubmit={handleForm} className='flex justify-center flex-col items-center gap-3 mt-5'>
          <input type="text" placeholder='Enter Name' className='border-[#000] border-[1px] outline-none w-96 p-2 rounded-md max-[425px]:w-72' required onChange={e=>setName(e.target.value)} value={name} />
          <input type="text" placeholder='Enter Tite' className='border-[#000] border-[1px] outline-none w-96 p-2 rounded-md max-[425px]:w-72' required onChange={e=>setTitle(e.target.value)} value={title} />
          <button type='submit ' className='bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 transition-all  max-[425px]:w-72'>Add Todo</button>
        </form>
      </div>

     {
       data.length > 0 ?  data.map((item, index) => (
        <div className='flex justify-center mt-3'>
       <div className='w-96 max-[425px]:w-72 flex flex-col gap-2 border-[1px] border-gray-100 shadow-sm bg-blue-50 p-2 rounded-md'>
          <p className='text-center poppins-regular mt-2 bg-blue-200 p-2 rounded-md'>Name: <span className='semibold poppins-semibold '>{item.name}</span></p>
          <p className='text-center  poppins-regular bg-blue-200 p-2 rounded-md '>Title: <span className=' poppins-semibold'>{item.title}</span></p>
        
        <div className='flex gap-3 justify-center'>
        <button className='bg-[#5ae247e0] px-2 py-1 rounded-lg text-[#fff] w-full flex items-center justify-between poppins-regular' onClick={()=>handleEdit(index)}>Edit <RiEdit2Fill className='text-xl'/></button>
        <button className='bg-[#eb4a4a] px-2 py-1 rounded-lg text-[#fff] w-full  flex items-center justify-between poppins-regular'  onClick={()=>handleDelete(index)}>Delete <MdAutoDelete className='text-xl'/>
        </button>
        </div>
       </div>
        </div>
       )): <div className='flex justify-center'>
        <p className='text-center poppins-semibold text-xl mt-5 bg-blue-50 p-2 w-96 rounded-md max-[425px]:text-lg max-[425px]:w-72'>No Todo...</p>
       </div>
      }

    </>
  );
}

export default App;


{/* <p key={item.id}>
            Name: {item.name} Title: {item.title}</p> */}


            // bg-[#cce7f5] 
            // border-[1px] border-black
