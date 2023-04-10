import React, { useState } from "react";
import {
  FormControl,
  Input,
  TextField,
  Button,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserForm = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [bio,setBio]=useState('')

    const navigate=useNavigate();

    const handleSubmit=async (e)=>{
        e.preventDefault()
        const newUser={name,email,bio}
        try{
            const data=await axios.post('http://localhost:8000/users',newUser)
            if(data){
                alert('User created Successfully')
                navigate('/posts')
            }
        }catch(err){
            console.log(err)
        }

    }
  return (
    <form onSubmit={handleSubmit}>
    <FormControl style={{ marginTop: "30px" }}>
      <Input placeholder="Enter your name" type="text" value={name} onChange={(e)=>setName(e.target.value)} required={true} />
      <br />
      <Input placeholder="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required={true} />
      <br />
      <TextField placeholder="Bio" type="text" value={bio} onChange={(e)=>setBio(e.target.value)} />
      <br/>
      <Button variant="contained" type="submit">Submit</Button>
    </FormControl>
    </form>
  );
};

export default UserForm;
