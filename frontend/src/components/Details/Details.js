import React, { useContext } from 'react'
import { LoginContext } from "../../App";

//Details function
const Details = () => {

  //useState
  const { productDetails, setProductDetails } = useContext(LoginContext);

  //return of the component
  return (
    <>
    <div>
      {productDetails.productName}
    </div>
    </>
  )
}

export default Details;
// productName, reason, link, productImage, isSafeProduct, categories, oppositeProduct, createdBy, review