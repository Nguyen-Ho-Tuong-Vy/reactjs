
import { useLocation } from 'react-router-dom';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Menuleft from './layout/Menuleft';
import Menuacc from './layout/Menuacc';
import { UserContext } from './UserContext';
import { useState } from 'react';


function App(props) {

  const user = 1

  const [getTotalqty, setTotalQty] = useState(0)

  let paramsLocation = useLocation()
  // console.log(paramsLocation)

  function TotalQty(data){
    console.log(data)
    setTotalQty(data)
  }
  return (
    <UserContext.Provider value={{
      TotalQty : TotalQty,
      getTotalqty : getTotalqty
    }}>
      <Header/>
      <section id="cart_items">
        <div className='container'>
          <div className='row'>
            {paramsLocation['pathname'].includes("account") ? <Menuacc/> : <Menuleft/>}
            
            {props.children}
          </div>
        </div>
      </section>
      <Footer/>
    </UserContext.Provider>
  );
}

export default App;
