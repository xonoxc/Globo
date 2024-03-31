import { Plans as plans } from "../Plans/plans"
import { Check } from "lucide-react"
import { Button } from "../components"

export default function Pricing(): JSX.Element {
  return (
    <div className="w-full py-8 mt-4 text-center">
      <span className="text-5xl font-bold">
        Simple Pricing ,<span className="text-gray-500">Multiple benifits</span>
      </span>
      <div className="container mx-auto p-8">
        <div className="flex justify-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="w-2/3 flex items-center justify-between bg-white shadow-md rounded-lg p-8 mx-4"
            >
              <span>
                <h2 className="text-xl font-semibold mb-4">{plan.name}</h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <span className="flex items-start flex-col p-5">
                  {plan.benifits.map((benifit) => (
                    <ul>
                      <li className="flex items-center gap-2 justify-center">
                        <Check size={12} />
                        {benifit}
                      </li>
                    </ul>
                  ))}
                </span>
              </span>
              <span>
                <p className="text-gray-60 text-7xl mb-4">{plan.price}</p>
                <Button className="bg-black w-full text-white font-bold py-2 px-4 rounded-lg">
                  Upgrade
                </Button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
