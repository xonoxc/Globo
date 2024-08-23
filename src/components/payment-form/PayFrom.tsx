import { useState } from "react"
import { CreditCard } from "lucide-react"
import { subService } from "../../services/payment"
import { useNavigate } from "react-router-dom"

const PaymentCard = () => {
     const navigate = useNavigate()
     const [error, setError] = useState<string>("")
     const [formData, setFormData] = useState({
          name: "",
          cardNumber: "",
          month: "1",
          year: new Date().getFullYear().toString(),
          cvc: "",
     })

     const handleInputChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
     ) => {
          const { id, value } = e.target
          setFormData((prev) => ({ ...prev, [id]: value }))
     }

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
          setError("")
          try {
               const response = await subService.create(
                    Number(formData.cardNumber)
               )
               if (response.status == 200) {
                    navigate("/")
               }
          } catch (error) {
               console.error("Error creating subscription:", error)
          }
     }

     return (
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden border-black">
               {error && <span className="text-red-400"> {error}</span>}
               <form onSubmit={handleSubmit} className="p-6 ">
                    <h2 className="text-xl font-semibold text-gray-900">
                         Payment Method
                    </h2>
                    <p className="text-gray-600 mt-2">
                         Proceed with the subscription
                    </p>

                    <label
                         htmlFor="card"
                         className="cursor-pointer flex flex-col items-center justify-between rounded-md border-2 p-4 border-gray-400 mt-6"
                    >
                         <input
                              type="radio"
                              value="card"
                              id="card"
                              className="sr-only"
                              checked
                              readOnly
                         />
                         <CreditCard className="mb-3 h-6 w-6 text-gray-700" />
                         <span className="text-gray-700">Card</span>
                    </label>

                    <div className="mt-6 grid gap-2">
                         <label
                              htmlFor="name"
                              className="text-sm text-gray-600"
                         >
                              Name
                         </label>
                         <input
                              id="name"
                              placeholder="First Last"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                         />
                    </div>
                    <div className="grid gap-2 mt-4">
                         <label
                              htmlFor="number"
                              className="text-sm text-gray-600"
                         >
                              Card number
                         </label>
                         <input
                              id="cardNumber"
                              placeholder="XXXX XXXX XXXX XXXX"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                         />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                         <div className="grid gap-2">
                              <label
                                   htmlFor="month"
                                   className="text-sm text-gray-600"
                              >
                                   Expires
                              </label>
                              <select
                                   id="month"
                                   value={formData.month}
                                   onChange={handleInputChange}
                                   className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                              >
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
                              <label
                                   htmlFor="year"
                                   className="text-sm text-gray-600"
                              >
                                   Year
                              </label>
                              <select
                                   id="year"
                                   value={formData.year}
                                   onChange={handleInputChange}
                                   className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-3"
                              >
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
                              <label
                                   htmlFor="cvc"
                                   className="text-sm text-gray-600"
                              >
                                   CVC
                              </label>
                              <input
                                   id="cvc"
                                   placeholder="CVC"
                                   value={formData.cvc}
                                   onChange={handleInputChange}
                                   className="w-full"
                              />
                         </div>
                    </div>
                    <div className="mt-6">
                         <button
                              type="submit"
                              className="w-full bg-black text-white py-2 px-4 rounded-md transition"
                         >
                              Continue
                         </button>
                    </div>
               </form>
          </div>
     )
}

export default PaymentCard
