import Image from 'next/image'
import React from 'react'
import { signIn } from 'next-auth/react'


function Login() {
    
  return (
    <div className="grid place-items-center">
        <Image
            src={'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-facebook-2019-circle-512.png'}
            width={400}
            height={400}
            objectFit='contain'
        />
        <h1 onClick={signIn} className="p-5 my-10 cursor-pointer bg-blue-500 rounded-full text-white text-center">Login with facebook</h1>
    </div>
  )
}

export default Login