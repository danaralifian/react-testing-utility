import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios'
import { Button } from '@material-ui/core';
import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import firegraph from 'firegraph'
import { request, gql, GraphQLClient } from 'graphql-request'
import TextField from '@material-ui/core/TextField'

function App(props) {
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')

  const HOST = 'http://localhost:3002/graphql'
  useEffect(()=>{

  })

  const subscribe = ()=>{
    const subscription = gql`
      subscription updatedBook($id : String = "${id.toString()}"){
        updatedBook(id : $id){
          title
          author
        }
      }
    `

    request(HOST, subscription)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }

  const testGraphQl = ()=>{
    const query = gql`
      {
        books {
          id
          title
          author
        }
      }
    `
    request(HOST, query)
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const postQuery = ()=>{
    axios({
      method : 'POST',
      url : HOST,
      headers : {
        'Content-Type': 'application/json'
      },
      data : {
        query : `{
          books {
            id
            title
            author
          }
        }`
      }
    })
    .then(res =>{
      console.log(res.data)
    }) 
    .catch(err=>{
      console.log(err)
    })
  }

  const createMutation = ()=>{
    const mutation = gql`
      mutation addBook($title : String = "Text Book", $author : String = "John"){
        addBook(title : $title, author : $author){
          title
          author
        }
      }
    `
    request(HOST, mutation)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }

  const updateMutation = ()=>{
    const mutation = gql`
      mutation updateBook($id : String = "${id.toString()}", $title : String = "${title.toString()}", $author : String = "John"){
        updateBook(id: $id, title : $title, author : $author){
          title
          author
        }
      }
    `
    request(HOST, mutation)
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }

  return (
    <div style={{padding : 20}}>
      <h1 style={{textAlign : 'center'}}>GraphQL Tutor</h1>
      <TextField
        id="outlined-required"
        label="ID "
        variant="outlined"
        onChange={(e)=>setId(e.target.value)}
      />
      <TextField
        id="outlined-required"
        label="Title"
        variant="outlined"
        onChange={(e)=>setTitle(e.target.value)}
      />
      <br/>
      <Button color='primary' variant="contained" onClick={subscribe}>Subscribe</Button>
      <Button color='primary' variant="contained" onClick={testGraphQl}>Query</Button>
      <Button color='primary' variant="contained" onClick={createMutation}>Create Mutation</Button>
      <Button color='primary' variant="contained" onClick={updateMutation}>Update Mutation</Button>
    </div>
  );
}

export default App;
