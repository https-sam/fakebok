import React from 'react';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useRef } from 'react';
import { db, storage  } from '../firebase';
import { ref, uploadBytesResumable, getStorage, getDownloadURL } from "firebase/storage";
import { setDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';



function InputBox() {
    const { data: session, status } = useSession();
    const inputRef = useRef(null);
    const fileRef = useRef(null);
    const [imageToPost, setImageToPost]   = useState(null);
    const [imageToPostUrl, setImageToPostUrl]   = useState(null);


    const sendPost = (e) => {
        e.preventDefault();
        if(!inputRef.current.value) return;

        const addPost = async () => {
            const randKey = String(Math.random()*10000000000000000);
            await setDoc(doc(db, 'posts', randKey), { 
                message: inputRef.current.value,
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
            });
            const updateTimestamp = await updateDoc(doc(db, 'posts', randKey), {
                timestamp: serverTimestamp()
            });
            if(imageToPost) {
                const storageRef = ref(storage, randKey);
                const uploadTask = uploadBytesResumable(storageRef, imageToPost);

                uploadTask.on(
                'state_changed', 
                (snapshot) => {
                    console.log('image uploaded')
                },
                (err) => console.log(err),

                () => {
                    // get url to the image
                    getDownloadURL(uploadTask.snapshot.ref)
                    .then((url) => {
                        console.log(url);
                        setDoc(doc(db, 'posts', randKey), { 
                           imageUrl: url
                        }, {merge: true});
                    })
                }

                );

                removeImage();
            }
        };

        addPost();
        inputRef.current.value = '';
    }

    const uploadImage = (e) => {
        setImageToPost(e.target.files[0]);

        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setImageToPostUrl(readerEvent.target.result);
        }
    }

    const removeImage = () => {
        setImageToPost(null);
    }
        
    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className='flex space-x-4 p-4 items-center'> 
                <Image
                    className='rounded-full'
                    src={session.user.image}
                    width='40'
                    height='40'
                    layout='fixed'
                />  
                <form className='flex flex-1'>
                    <input className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none' ref={inputRef} type='text' placeholder={`What's on your mind, ${session.user.name}?`}/>
                    <button  type='submit' onClick={sendPost}></button>
                </form>

                {imageToPost && (
                    <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                        <img className='h-10 object-contain' src={imageToPostUrl} alt=''/>
                        <p className='text-xs text-red-500 text-center'>Remove</p>
                    </div>
                )}
            </div>
            <div className='flex justify-evenly p-3 border-t'>
                <div  className='input-icon'>
                    <VideoCameraIcon className='h-7 text-red-500'/>
                    <p className='text-xs sm:text-sm xl:text-base'>Live Video</p>
                </div>
                
                <div onClick={() => fileRef.current.click()} className='input-icon'>
                    <CameraIcon className='h-7 text-green-400'/>
                    <p className='text-xs sm:text-sm xl:text-base'>Photo/video</p>    
                    <input type='file' ref={fileRef} onChange={uploadImage} hidden/>
                </div>

                <div className='input-icon'>
                    <EmojiHappyIcon className='h-7 text-yellow-300'/>
                    <p className='text-xs sm:text-sm xl:text-base'>Feeling/activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox