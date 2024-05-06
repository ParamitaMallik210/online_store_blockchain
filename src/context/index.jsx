import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  // const { contract } = useContract('0x5Bb014D2571c3e1799D49fb562e5Bbf7C3F4B20A');
  const { contract } = useContract('0x8FDFee1044BA34D784888784728955c3be1f4A6e');
  const { mutateAsync: createProduct } = useContractWrite(contract, 'createAsset');

  const address = useAddress();
  const connect = useMetamask();

  const publishProduct = async (form) => {
    try {
      const data = await createProduct({
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.quantity,
          form.priceperunit,
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getProducts = async () => {
    const products = await contract.call('getAssets');
    const parsedProducts = products.map((product, i) => (
      {
      owner: product.owner,
      title: product.title,
      description: product.description,
      priceperunit: product.price ? ethers.utils.formatEther(product.price.toString()) : '',
      quantity: product.quantity ? product.quantity.toString() : '',
      available: product.available.toString(),
      image: product.image,
      buyer: product.buyer,
      boughtunits: product.boughtunits,
      pId: i
    }));

    return parsedProducts;
  }

  const getUserProducts = async () => {
    const allProducts = await getProducts();

    const filteredProducts = allProducts.filter((product) => product.owner === address);

    return filteredProducts;
  }

  const getAdminProductsSell = async (key) => {
    const allProducts = await getProducts();
  
    const filteredProducts = allProducts.filter((product) => product.owner === key);
  
    return filteredProducts;
  }

  
  

  const toBuyProduct = async (pId, amount) => {
    const data = await contract.call('toBuyAsset', [pId], { value:parseInt(amount, 10)});
    return data;
  }

  const getBuyer = async (pId) => {
    const buyer = await contract.call('getAssetBuyer', [pId]);
    const numberOfBuyer = buyer[0].length;

    const parsedBuyer = [];

    for(let i = 0; i < numberOfBuyer; i++) {
      parsedBuyer.push({
        buyer: buyer[0][i],
        boughtunits: buyer[1][i].toString(),
      })
    }
    return parsedBuyer;
  }

  const getBuyerProducts = async () => {
    const allProducts = await getProducts();
  
    let buyerProducts = [];  // Initialize buyerProducts as an empty array
  
    for (const product of allProducts) {
      const buyers = await getBuyer(product.pId);
      let buyersMap={
        buyerAddress: address,
        boughtunits: 0
      };
      for (let j = 0; j < buyers.length; j++) {
        if (buyers[j].buyer === address) {
          buyersMap.boughtunits+=parseInt(buyers[j].boughtunits, 10); 
        }
      }
      if (buyersMap.boughtunits > 0) {
        buyerProducts.push({
          owner: product.owner,
          title: product.title,
          description: product.description,
          priceperunit: product.priceperunit,
          quantity: product.quantity,
          available: buyersMap.boughtunits,
          image: product.image,
          pId: product.pId
        });
      }

    }
  
    return buyerProducts;
  }

  const getAdminProductsBuy = async (key) => {
    const allProducts = await getProducts();
  
    let buyerProducts = [];  // Initialize buyerProducts as an empty array
  
    for (const product of allProducts) {
      const buyers = await getBuyer(product.pId);
      let buyersMap={
        buyerAddress: address,
        boughtunits: 0
      };
      for (let j = 0; j < buyers.length; j++) {
        if (buyers[j].buyer === key) {
          buyersMap.boughtunits+=parseInt(buyers[j].boughtunits, 10); 
        }
      }
      if (buyersMap.boughtunits > 0) {
        buyerProducts.push({
          owner: product.owner,
          title: product.title,
          description: product.description,
          priceperunit: product.priceperunit,
          quantity: product.quantity,
          available: buyersMap.boughtunits,
          image: product.image,
          pId: product.pId
        });
      }

    }
  
    return buyerProducts;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createProduct: publishProduct,
        getProducts,
        getUserProducts,
        toBuyProduct,
        getBuyerProducts,
        getBuyer,
        getAdminProductsSell,
        getAdminProductsBuy
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);