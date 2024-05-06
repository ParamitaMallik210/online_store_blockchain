import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CountBox, CustomButton, Loader } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../products";

const ProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toBuyProduct, getBuyer, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [buyers, setBuyers] = useState([]);

  const fetchBuyers = async () => {
    const data = await getBuyer(state.pId);
    setBuyers(data);
  };

  useEffect(() => {
    if (contract) fetchBuyers();
  }, [contract, address]);

  const handletoBuyProduct = async () => {
    setIsLoading(true);

    await toBuyProduct(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="product"
            className="w-full h-[400px] object-cover rounded-xl"
          />
          {/* <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.priceperunit, state.available)}%`, maxWidth: '100%'}}>
            </div>
          </div> */}
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <CountBox title="Price per unit" value={state.priceperunit} />
              <CountBox title={`Available`} value={state.available} />
              <CountBox title="Total Quantity" value={state.quantity} />
            </div>
            <div style={{ height: "5vh" }}></div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Seller
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]"></p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Description
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div className="mt-[20px] flex flex-col p-4 bg-[#003049] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Buy the product
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="Enter the no of units"
                step="1"
                min="0"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <CustomButton
                btnType="button"
                title="Buy Product"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handletoBuyProduct}
              />
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Buyers
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {buyers.length > 0 ? (
                buyers.map((item, index) => (
                  <div
                    key={`${item.buyer}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {item.buyer}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.boughtunits}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No buyers yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
