import { Check } from "lucide-react"
import Button from "../Button"

interface Plan {
     name: string
     description: string
     benefits: string[]
     price: string
}

interface PricingCardProps {
     plan: Plan
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
     return (
          <div className="w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center justify-between bg-white shadow-md rounded-lg p-6 mx-2 my-4">
               <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex flex-col items-start">
                         {plan.benefits.map((benefit, index) => (
                              <ul
                                   key={index}
                                   className="flex items-center gap-2 mb-2"
                              >
                                   <Check size={12} />
                                   {benefit}
                              </ul>
                         ))}
                    </div>
               </div>
               <div className="text-center mt-6">
                    <p className="text-gray-600 text-4xl mb-4">{plan.price}</p>
                    <Button className="bg-black w-full text-white font-bold py-2 px-4 rounded-lg">
                         Upgrade
                    </Button>
               </div>
          </div>
     )
}

export default PricingCard
