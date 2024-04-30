
import './App.css';
import { EmployeeData } from './EmployeeData';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [data,setData]=useState([]);
  const [id,setId]=useState(0);
  const [name,setName]=useState('');
  const [age,setAge]=useState(0);
  const [email,setEmail]=useState('');
  const [isupdate,setIsUpdate]=useState(false);
  useEffect(()=>{
    setData(EmployeeData)
  },[]);

  const handleEdit = (id)=>{
    const dt= data.filter(item=>item.id===id);
    if(dt!==undefined)
    {
      setIsUpdate(true)
      setId(id);
      setName(dt[0].name);
      setAge(dt[0].age);
      setEmail(dt[0].email);
    }
  }

  const handleDelete   = (id)=>{
    if(id>0){
      if(window.confirm('Are you sure  you want to delete this item?'))
   { const dt= data.filter(item=>item.id!==id);
  setData(dt);
  }}
}

  const handleSave = (e)=>{
    let error = '';
    if(name==='')
    error+= 'Name is required'

    if(age<=0)
    error+= 'Age is required'

    if(email==='')
    error+= 'Email is required'

    if (error===''){
      e.preventDefault();
      const dt=[...data];
      const newObject={
        id:EmployeeData.length+1,
        name:name,
        age:age,
        email:email
      } 
      dt.push(newObject)
      setData(dt);
    }else{
      alert(error)
    }

    
  }
  const handleUpdate= ()=>{
    const index =data.map((item)=>{
     return item.id
   } ).indexOf(id);

   const dt =[...data];
   dt[index].name= name;
   dt[index].age= age;
   dt[index].email= email;

   setData(dt);
   handleClear();

  }
  const handleClear = ()=>{
      setId(0);
      setName('');
      setAge('');
      setEmail('');
      setIsUpdate(false)
  }

  return (
   <div className='App'>
    <div style={{display: 'flex',justifyContent:'center',marginTop:'12px',marginBottom:'10px'}}>
      <div>
        <label>Name:
          <input type='text' placeholder='Enter first name' onChange={(e)=>setName(e.target.value)} value={name}/>  
        </label>
      </div>
      <div>
        <label> Age:
          <input type='text' placeholder='Enter age' onChange={(e)=>setAge(e.target.value)}value={age}/>  
        </label>
      </div>
      <div>
        <label> Email:
          <input type='text' placeholder='Enter Email'onChange={(e)=>setEmail(e.target.value)} value={email}/>  
        </label>
      </div>
      <div>{
        !isupdate  ? 
        <button className='btn btn-primary' onClick={(e)=>handleSave(e)}>Save</button>
        :
        <button className='btn btn-primary' onClick={()=>handleUpdate()}>Update</button>
        }
       <button className='btn btn-danger' onClick={()=>handleClear()}>Clear</button>
      </div>
    </div>
    <table className='table table-hover'>
      <thead>
        <tr>
          <td>Sr.No</td>
          <td>Id</td>
          <td>Name</td>
          <td>Age</td>
          <td>Email</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item,index)=>{
            return(
              <tr key={index}>
               <td>{index+1}</td>
               <td>{item.id}</td>
               <td>{item.name}</td>
               <td>{item.age}</td>
               <td>{item.email}</td>
               <td>
                <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button>&nbsp;
                <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
               </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
   </div>
  );
}

export default App;
