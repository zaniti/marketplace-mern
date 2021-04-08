import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { editCart, listCart, removeFromCart } from '../actions/cartActions'


export default function CartScreen(props) {
    const cartList = useSelector(state => state.cartList);
    const { products, loading, error } = cartList ;

    const userSignin = useSelector(state=> state.userSignin);
    const {userInfo} = userSignin;
    
    const dispatch = useDispatch();


    
    const  removeFromCartHandler = (cartId) => {
        dispatch(removeFromCart(cartId))
    }

    const  editCartHandler = (cartId, qty) => {
        dispatch(editCart(cartId, qty))
    }

    

    useEffect(() => {
        if(!userInfo){
            props.history.push("/signin");
        }  else {
            dispatch(listCart(userInfo.id))

        }

                return () => {
            //
        }
    }, [])

     

    return (
        loading? <div>Loading ...</div>:
        error? <div>{error}</div>:
        <div className="cart">
            <div className="cart-list">
                <ul className="cart-list-container">
                    <li>
                        <h3>
                            Shopping cart
                        </h3>
                        <div>
                            Price
                        </div>
                    </li>
                    { 
                        products.length === 0?
                        <div>
                            Cart is empty
                        </div>
                        :
                        products.map( item =>
                            <li key={item._id}>
                                <div className="cart-image">
                                    <img src={"http://localhost:8080/imgs/"+item.idProduit.photo} alt="product" />
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to= {"/product/" + item.idProduit._id }>
                                            {item.idProduit.nom}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={item.Quantite} onChange={(e) => editCartHandler(item._id, e.target.value)}>
                                            
                                        {[...Array(item.idProduit.quantite).keys()].map(x=> 
                                   <option key={x+1} value={x+1}>{x+1}</option> 
                                    )}
                                        </select>
                                        <button tyep="button" onClick={() => removeFromCartHandler(item._id)} className="button" >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.idProduit.prix}
                                </div>
                            </li>      
                        )
                    }
                </ul>
            </div>
            <div className="cart-action">
                <h3>
                    Subtotal 
                    :
                    $ {products.reduce((a,c) => a + c.idProduit.prix * c.Quantite, 0)}
                </h3>
                <button  className="btn btn-danger full-width"  disabled={products.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    )
}
