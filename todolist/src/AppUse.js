import React,{useEffect, useState} from 'react';

import AddUser from './AddUser';

function AppUse(){

    const [data,setData]=useState([])
    const [title,setTitle]=useState("");
    const [completed,setCompleted]=useState("");
    const [userId,setUserId]=useState(null);
    useEffect(()=>{
      fetch("https://jsonplaceholder.typicode.com/todos").then((result)=>{
        result.json().then((resp)=>{
         // console.warn("result",resp)
          setData(resp);
        })
      })
    },[])
  
  
  const onAdd=async(title,completed)=>{
    await fetch("https://jsonplaceholder.typicode.com/todos",{
      method:'POST',
      body: JSON.stringify({
      
        title: title,
        completed: completed
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    .then((res)=>{
      if(res.status !== 201){
        return
      }else{
        return res.json();
      }
    })
    .then((value)=>{
      console.log(value);
      if(title && completed)
      {
        setData((data)=>[...data,value]);
      } 
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  

  const onDelete=async(id)=>{
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
      method:'DELETE'
    })
    .then((res)=>{
      if(res.status!==200){
        return
      }else{
        setData(data.filter((dat)=>{
          return dat.id !== id;
        }))
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
 function selectItem(id)
 {
     //console.warn("id",data[id-1])
     let item=data[id-1]
     setTitle(item.title)
     setCompleted(item.completed)
     setUserId(item.id)
     //console.log(item.id)
 }
 
 const updateList=async()=>
 {
   
  let item=[title,completed]
   console.log(userId)
  
  await fetch(`https://jsonplaceholder.typicode.com/todos/${userId}`,{
    method:'PUT',
    body: JSON.stringify(item),
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
  .then((res)=>{
    console.log(res);
    if(res.status!==200){
      return
    }else{
      setData(data.filter((dat)=>{
        if(dat.id===userId)
        {
          dat.completed=completed;
          return  dat.title = title;
        }
     
        return setData;
      }))
    }
  })
  .catch((err)=>{
    console.log(err);
  })
 }


  return(
    <>
          <div className="App">
          <h1>To do list</h1>
          <br/>
          <AddUser onAdd={onAdd}/>
          <br/>
          <div >
            <h3>Update in list</h3>
            <input type='text' placeholder='title' value={title} onChange={(e)=>{setTitle(e.target.value)}}    />
            <input type='text' placeholder='completed' value={completed} onChange={(e)=>{setCompleted(e.target.value)}}/>
            <button onClick={updateList}>Update</button>
          </div>
          <br/>
          <table border="1" id='table'>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Completed</th>
              <th colSpan={2}>Operations</th>
            </tr>
            {
              data.map((item,i)=>
             <tr key={i}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.completed.toString()}</td>
                <td><button id='update-button'  onClick={()=>selectItem(item.id)}>Update2</button></td> 
                <td ><button id='delete-button' onClick={()=>onDelete(item.id)}>Delete</button></td>
             </tr>
              )
            }
          </table>
        
    </div>
    </>
  )
}

export default AppUse;