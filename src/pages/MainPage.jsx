import React, { useState, useEffect } from "react";
import ContentWrapper from "../components/contentWrapper/ContentWrapper";
import TagValue from "../components/tag&Value/TagValue";
import LabelInput from "../components/LabelInput/LabelInput";
import Header from "../components/header/Header";

import { IoCheckmarkSharp } from "react-icons/io5";
import { FaLessThan } from "react-icons/fa6";
import { FaGreaterThan } from "react-icons/fa6";

const MainPage = () => {
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [investmentType, setInvestmentType] = useState("Long Term");
  const [annualIncome, setAnnualIncome] = useState("");
  const [taxDetails, setTaxDetails] = useState({ base: 0, rate: 0 });
  const [showTax , setShowTax]=useState("-")

  const calculateTaxDetails = (income) => {
    switch (income) {
      case "a":
        setShowTax('0%')
        return { base: 0, rate: 0 };
      case "b":
        setShowTax('0%')
        return { base: 0, rate: 0 };
      case "c":
        setShowTax('Nil + 19% of excess over $18,200');
        return { base: 0, rate: 0.19 };
      case "d":
        setShowTax('$5092 + 19% of excess over $45,000');
        return { base: 5092, rate: 0.325 };
      case "e":
        setShowTax('$29,467 + 19% of excess over $120,000');
        return { base: 29467, rate: 0.37 };
      case "f":
        setShowTax('$51,667 + 19% of excess over $180,000');
        return { base: 51667, rate: 0.45 };
      default:
        return { base: 0, rate: 0 };
    }
  };

  useEffect(() => {
    const { base, rate } = calculateTaxDetails(annualIncome);
    setTaxDetails({ base, rate });
  }, [annualIncome]);

  const capitalGainsAmount = salePrice - purchasePrice - expenses;
  const discountForLongTermGains =
    investmentType === "Long Term" && capitalGainsAmount > 0
      ? capitalGainsAmount * 0.5
      : 0;
  const netCapitalGains =
    investmentType === "Long Term"
      ? capitalGainsAmount - discountForLongTermGains
      : capitalGainsAmount;

  const taxToBePaid =
    taxDetails.base + taxDetails.rate * (netCapitalGains > 0 ? netCapitalGains : 0);

  return (
    <div className="w-full bg-[#eff2f5] border-2 border-black">
      <Header />
      <ContentWrapper className="p-4 flex gap-4">
        <div className="bg-white px-16 py-8 rounded-lg w-[70%]">
          <h1 className="text-center font-bold text-4xl mb-8">
            Free Crypto Tax Calculator Australia
          </h1>

          <div className="flex gap-12 items-center">
            <div className="w-1/2">
              <TagValue title="Financial Year" options={["FY- 2023-24"]} />
            </div>
            <div className="w-1/2">
              <TagValue title="Country code" options={["Australia"]} />
            </div>
          </div>

          <hr className="my-8" />

          <div className="w-full flex gap-12">

            {/* leftSide */}
            <div className="leftbox w-1/2 flex flex-col gap-4">
              <div>
              <LabelInput
                title="Enter purchase price of Crypto"
                setValue={(value) => setPurchasePrice(parseFloat(Number(value)) || 0)}
                />
              </div>
              <div className="mt-4">
                <LabelInput
                  title="Enter Your Expenses"
                  setValue={(value) => setExpenses(parseFloat(Number(value)) || 0)}
                  />
              </div>
              {/* 3- annual income select option */}
              <div className="mt-8">
                <label
                  htmlFor="annualIncome"
                  className="w-fit inline-block shrink-0 mb-1"
                >
                  Select Your Annual Income
                </label>
                <select
                  id="annualIncome"
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full bg-[#eff2f5] px-2 py-3 font-semibold rounded-md"
                >
                  <option value="a">Select Income Range</option>
                  <option value="b">$0 - $18,200</option>
                  <option value="c">$18,201 - $45,000</option>
                  <option value="d">$45,001 - $120,000</option>
                  <option value="e">$120,001 - $180,000</option>
                  <option value="f">$180,000+</option>
                </select>
              </div>

              {/* 4- capital gain */}
              {investmentType === "Long Term" && (
                <>
                  <div className=" relative mt-4">
                    <h1>Capital Gains Amount</h1>
                    <p className="w-full bg-[#eff2f5] px-6 py-3 rounded-md font-semibold text-xl">{capitalGainsAmount}</p>
                    <span className=" absolute px-6 py-3 top-6 -left-3 text-xl  font-semibold">{`$`}</span>
                  </div>
                </>
              )}
              <div className="border bg-[#EBF9F4] py-2 text-center mt-8 rounded-xl">
                <h1 className="py-2 text-xl font-semibold ">Net Capital gains tax amount</h1>
                <p className="text-[#0FBA83] font-bold text-2xl pb-2 ">{`$${netCapitalGains}`}</p>
              </div>
            </div>

            {/* right box  */}
            <div className="rightbox w-1/2">
              <div >
                <LabelInput
                  title="Enter sale price of Crypto"
                  setValue={(value) => setSalePrice(parseFloat(Number(value)) || 0)}
                />
              </div>
              {/* 2- investment type  */}
              <div className="mt-8">
                <h1>Investment Type</h1>
                <div className="flex my-1">
                  <div
                    className={`w-1/2 mr-3 cursor-pointer `}
                    onClick={() => setInvestmentType("Short Term")}
                  >
                    <h1 className={`border-2 flex items-center border-black px-2 py-3 rounded-md  font-semibold ${
                      investmentType === "Short Term" ? " border-blue-700 text-blue-700 " : ""
                    }`}>
                      Short Term
                     {investmentType === "Short Term" ?  <IoCheckmarkSharp className=" inline-block text-xl ml-2 text-blue-700"/> : null }
                    </h1>
                    <span className="flex items-center gap-1"><FaLessThan className=" inline-block text-[12px]" />  12 months</span>
                  </div>
                  <div
                    className={`w-1/2 cursor-pointer `}
                    onClick={() => setInvestmentType("Long Term")}
                  >
                    <h1 className={`border-2 flex items-center border-black px-2 py-3 rounded-md font-semibold ${
                      investmentType === "Long Term" ? " border-blue-700 text-blue-700 " : ""
                    }`}>
                      Long Term
                      {investmentType === "Long Term" ?  <IoCheckmarkSharp className=" inline-block text-xl ml-2 text-blue-700"/> : null }
                    </h1>
                    <span className="flex items-center gap-1"><FaGreaterThan className=" inline-block text-[12px]" />  12 months</span>
                  </div>
                </div>
              </div>
             
             {/* 3- tax slab shown here */}
             <div className="mt-12 text-sm">
                <h1 className=""> Tax Rate</h1>
                <p className="pb-3 font-medium">{showTax}</p>
             </div>


              {investmentType === "Long Term" && (
                <>
                  <div className=" relative mt-8">
                    <h1>Discount for Long Term Gains</h1>
                    <p className="w-full bg-[#eff2f5] px-6 py-3 rounded-md font-semibold text-xl">{discountForLongTermGains}</p>
                    <span className=" absolute px-6 py-3 top-6 -left-3 text-xl  font-semibold">{`$`}</span>
                  </div>
                </>
              )}

              <div className="mt-12 mb-2">
              <div className="border bg-[#EBF2FF] py-2 text-center mt-4 rounded-xl">
                <h1 className="py-2 text-xl font-semibold ">The tax you need to pay*</h1>
                <p className="text-[#0141CF] font-bold text-2xl pb-2 ">{taxToBePaid.toFixed(2)}</p>
              </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0052fe] p-8 rounded-lg w-[30%] h-[60vh]">
          <h1 className="text-center"></h1>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default MainPage;
