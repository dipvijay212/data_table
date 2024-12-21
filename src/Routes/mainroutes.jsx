import React from 'react'
import { Route, Routes } from 'react-router'
import Addproduct from '../Component/Addproduct'
import Login from '../Component/Login'
import Home from '../Component/Home'
import Product from '../Component/Product'
import { Privates } from '../Component/private'
import Description from '../Component/Description'
import Update from '../Component/Update'

const Mainroutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/Home' element={<Home />}></Route>
        <Route path='/Product' element={
          <Privates>
          <Product />
          </Privates>}></Route>
        <Route path='/Addproduct' element={<Addproduct />}></Route>
        <Route path='/Description/:id' element={<Description />}></Route>
        <Route path='/Update' element={<Update />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='*' element={<h1>404: Page not found</h1>}></Route>
      </Routes>
    </div>
  )
}

export default Mainroutes
