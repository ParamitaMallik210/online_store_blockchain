import React, { useState, useEffect } from 'react'

import { DisplayProducts } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const { address, contract, getUserProducts } = useStateContext();

  const fetchProducts = async () => {
    setIsLoading(true);
    const data = await getUserProducts();
    setProducts(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchProducts();
  }, [address, contract]);

  return (
    <DisplayProducts 
      title="All Products"
      isLoading={isLoading}
      products={products}
    />
  )
}

export default Profile