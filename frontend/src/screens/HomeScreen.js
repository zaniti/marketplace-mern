import React, { useState , useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../actions/productsActions'


export default function HomeScreen() {
    
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList ;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())

        return () => {
            //
        }
    }, [])

    return (
        loading? <div>Loading ...</div>:
        error? <div>{error}</div>:
        <ul className="products">
          {
            products.map(product => 
              <li key={product._id}>
            <div className="product">
            <Link to={"/product/" + product._id}>
              <img className="product-image" src={"http://localhost:8080/imgs/"+product.photo} alt="product" />
                </Link>

              <div className="product-name">
                <Link to={"/product/" + product._id}>{product.nom}</Link>
              </div>
              <div className="product-price">{product.prix} MAD</div>
              <div className="product-brand">Quantite : {product.quantite}</div>
              {/* <div className="product-rating">{product.date}</ div> */}
              <br></br>
            </div>
          </li>
              )
          }
          
         

        </ul>
    )
}
