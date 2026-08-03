import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/backend/Dashboard'
import CustomerIndex from '../pages/backend/Customer/CustomerIndex'
import CustomerCreate from '../pages/backend/Customer/CustomerCreate'
import CustomerEdit from '../pages/backend/Customer/CustomerEdit'
import ProductIndex from '../pages/backend/products/ProductIndex'
import ProductCreate from '../pages/backend/products/ProductCreate'
import ProductEdit from '../pages/backend/products/ProductEdit'
import SaleMasterIndex from '../pages/backend/saleMaster/SaleMasterIndex'
import SaleMasterCreate from '../pages/backend/saleMaster/SaleMasterCreate'
import SalesMasterEdit from '../pages/backend/saleMaster/SalesMasterEdit'
import DefaultLayout from '../layout/DefaultLayout'
import SaleView from '../pages/backend/saleMaster/SaleView'

const DefaultRoutes = () => {
  return (
    <div>
    <DefaultLayout>
        <Routes>
           <Route path='/' element={<Dashboard/>}/>
           <Route path='/customers' element={<CustomerIndex/>}/>
           <Route path='/customers/create' element={<CustomerCreate/>}/>
           <Route path='/customers/edit/:id' element={<CustomerEdit/>}/>

          
           <Route path='/products' element={<ProductIndex/>}/>
           <Route path='/products/create' element={<ProductCreate/>}/>
           <Route path='/products/edit/:id' element={<ProductEdit/>}/>

           <Route path='/salemasters' element={<SaleMasterIndex/>}/>
           <Route path='/salemasters/create' element={<SaleMasterCreate/>}/>
           <Route path='/salemasters/edit/:id' element={<SalesMasterEdit/>}/>
           <Route path='/salemasters/show/:id' element={<SaleView/>}/>
        </Routes>
        </DefaultLayout>
    </div>
  )
}

export default DefaultRoutes