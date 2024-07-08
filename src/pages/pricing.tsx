import { Plans as plans } from "../Plans/plans.ts"
import PricingCard from "../components/pricing/pricing-card"

export default function Pricing(): JSX.Element {
     return (
          <div className="w-full py-8 mt-4 text-center">
               <span className="text-5xl font-bold">
                    Simple Pricing,
                    <span className="text-gray-500">Multiple benefits</span>
               </span>
               <div className="container mx-auto p-8">
                    <div className="flex flex-wrap justify-center">
                         {plans.map((plan, index) => (
                              <PricingCard key={index} plan={plan} />
                         ))}
                    </div>
               </div>
          </div>
     )
}
