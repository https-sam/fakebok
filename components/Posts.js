import React from 'react'
import { db } from '../firebase';
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from 'react';
import Post from './Post';


function Posts() {
    const [postData, setPostData] = useState([]);

    const getData = async () => { 
        const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ 
            ...doc.data(), 
            id: doc.id,
        }));
        setPostData(data);
        console.log(data)
    }

    useEffect(() => {
        getData();
    }, [])
    
  return (
    <div>
        {postData.map(post => (
            <Post
            name={post.name}
            key={post.id}
            message={post.message}
            email={post.email}
            timestamp={post.timestamp}
            image={post.image}
            imageUrl={post.imageUrl}
            />
        ))}
    </div>
  )
}

export default Posts;