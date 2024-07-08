import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

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



  const handleDelete = (index) => {
    // console.log("delete", index);
    console.log(data[index]._id);
  
    axios.delete('http://localhost:3000/todos', {name, title})
    
  }



  return (
    <>
      <div className='text-center font-bold mt-5 text-xl'>Backend Todo</div>

      <div className=''>
        <form onSubmit={handleForm} className='flex justify-center flex-col items-center gap-3 mt-5'>
          <input type="text" placeholder='Enter Name' className='border-[#000] border-[1px] outline-none w-96 p-2 rounded-md' required onChange={e=>setName(e.target.value)} value={name} />
          <input type="text" placeholder='Enter Tite' className='border-[#000] border-[1px] outline-none w-96 p-2 rounded-md' required onChange={e=>setTitle(e.target.value)} value={title} />
          <button type='submit ' className='bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 transition-all'>Add</button>
        </form>
      </div>

     {
        data.map((item, index) => (
         <div className='flex justify-center mt-3'>
        <div className='   w-96 flex flex-col gap-2'>
           <p className='text-center poppins-regular-italic mt-2 bg-[#f0efef] p-2'>Name: <span className='font-semibold poppins-semibold-italic '>{item.name}</span></p>
           <p className='text-center  poppins-regular-italic bg-[#f0efef] p-2  '>Title: <span className='font-semibold poppins-semibold-italic'>{item.title}</span></p>
         
         <div className='flex gap-3 justify-center'>
         <button className='bg-[#69da5ae0] px-2 py-1 rounded-lg text-[#fff]'>Edit</button>
         <button className='bg-[#eb4a4a] px-2 py-1 rounded-lg text-[#fff]'  onClick={()=>handleDelete(index)}>Delete</button>
         </div>
        </div>
         </div>
        ))
      }

    </>
  );
}

export default App;


{/* <p key={item.id}>
            Name: {item.name} Title: {item.title}</p> */}


            // bg-[#cce7f5] 
            // border-[1px] border-black
