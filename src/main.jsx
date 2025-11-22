import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'



// const router = createBrowserRouter (
//   createRoutesFromElements(
//     <Route path='/' element={<Layout/>}>
//          <Route path='' element={
//             <>
//               <BoxBody/>
//               <About/>
//             </>} 
//           /> 
//          <Route path='about' element={<About/>} />
//          <Route path='signup' element={<SignUp/>}/>
//          <Route path='login' element={<SignUp/>}/> 

//     </Route>
 
//   )
// )


createRoot(document.getElementById('root')).render(
 
  <StrictMode>
    <App />
  </StrictMode>,
)
