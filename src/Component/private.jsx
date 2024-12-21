import React from 'react'

export const Privates = ({children}) => {
   
    const isAuth = localStorage.getItem('token')

    if (!isAuth) {
        window.location.href = "./Login"
    }
    else{
        return children
    }
  
}



