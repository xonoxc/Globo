import { useState } from "react"
import { CreditCard, Apple, PiggyBank } from "lucide-react"

const PaymentCard = () => {
     const [paymentMethod, setPaymentMethod] = useState("card")

     return (
          <div className="card">
               <div className="card-header">
                    <h2 className="card-title">Payment Method</h2>
                    <p className="card-description">
                         Add a new payment method to your account.
                    </p>
               </div>
               <div className="card-content grid gap-6">
                    <div className="grid grid-cols-3 gap-4">
                         <label
                              htmlFor="card"
                              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                                   paymentMethod === "card"
                                        ? "border-primary"
                                        : "border-muted"
                              }`}
                              onClick={() => setPaymentMethod("card")}
                         >
                              <input
                                   type="radio"
                                   value="card"
                                   id="card"
                                   className="sr-only"
                                   checked={paymentMethod === "card"}
                                   onChange={() => setPaymentMethod("card")}
                              />
                              <CreditCard className="mb-3 h-6 w-6" />
                              Card
                         </label>
                         <label
                              htmlFor="paypal"
                              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                                   paymentMethod === "paypal"
                                        ? "border-primary"
                                        : "border-muted"
                              }`}
                              onClick={() => setPaymentMethod("paypal")}
                         >
                              <input
                                   type="radio"
                                   value="paypal"
                                   id="paypal"
                                   className="sr-only"
                                   checked={paymentMethod === "paypal"}
                                   onChange={() => setPaymentMethod("paypal")}
                              />
                              <PiggyBank className="mb-3 h-6 w-6" />
                              Paypal
                         </label>
                         <label
                              htmlFor="apple"
                              className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                                   paymentMethod === "apple"
                                        ? "border-primary"
                                        : "border-muted"
                              }`}
                              onClick={() => setPaymentMethod("apple")}
                         >
                              <input
                                   type="radio"
                                   value="apple"
                                   id="apple"
                                   className="sr-only"
                                   checked={paymentMethod === "apple"}
                                   onChange={() => setPaymentMethod("apple")}
                              />
                              <Apple className="mb-3 h-6 w-6" />
                              Apple
                         </label>
                    </div>
                    <div className="grid gap-2">
                         <label htmlFor="name">Name</label>
                         <input
                              id="name"
                              placeholder="First Last"
                              className="input"
                         />
                    </div>
                    <div className="grid gap-2">
                         <label htmlFor="number">Card number</label>
                         <input id="number" placeholder="" className="input" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                         <div className="grid gap-2">
                              <label htmlFor="month">Expires</label>
                              <select id="month" className="select">
                                   <option value="1">January</option>
                                   <option value="2">February</option>
                                   <option value="3">March</option>
                                   <option value="4">April</option>
                                   <option value="5">May</option>
                                   <option value="6">June</option>
                                   <option value="7">July</option>
                                   <option value="8">August</option>
                                   <option value="9">September</option>
                                   <option value="10">October</option>
                                   <option value="11">November</option>
                                   <option value="12">December</option>
                              </select>
                         </div>
                         <div className="grid gap-2">
                              <label htmlFor="year">Year</label>
                              <select id="year" className="select">
                                   {Array.from({ length: 10 }, (_, i) => (
                                        <option
                                             key={i}
                                             value={
                                                  new Date().getFullYear() + i
                                             }
                                        >
                                             {new Date().getFullYear() + i}
                                        </option>
                                   ))}
                              </select>
                         </div>
                         <div className="grid gap-2">
                              <label htmlFor="cvc">CVC</label>
                              <input
                                   id="cvc"
                                   placeholder="CVC"
                                   className="input"
                              />
                         </div>
                    </div>
               </div>
               <div className="card-footer">
                    <button className="button w-full">Continue</button>
               </div>
          </div>
     )
}

export default PaymentCard
