import classNames from 'classnames'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage, BasketPage, NotFoundPage, LoginPage, RegisterPage } from './pages'
import { AccountPage, CataloguePage, ProductPage, CheckoutPage } from './pages'
import { Header, Footer } from './components'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from './reducers/user.reducer'
import useBasket from './hooks/useBasket'

import './App.scss'

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    useBasket()

    const [menuOpen, setMenuOpen] = useState(false)

    return <div className={classNames('app', { 'app--locked': menuOpen })}>
        <BrowserRouter>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/products/:productId' element={<ProductPage/>}/>
                <Route path='/catalogue/:category?' element={<CataloguePage/>}/>
                <Route path='/basket' element={<BasketPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route path='/account' element={<AccountPage/>}/>
                <Route path='/checkout' element={<CheckoutPage/>}/>
                <Route path='/*' element={<NotFoundPage/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
}

export default App