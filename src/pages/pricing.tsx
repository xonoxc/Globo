import { Plans as plans } from "../Plans/plans.ts"
import PricingCard from "../components/pricing/pricing-card"
import { useSelector } from "react-redux"
import { RootState } from "../store/store.ts"
import { useSubscrtiption } from "../hooks/useSubscription.tsx"

export default function Pricing(): JSX.Element {
     const userId = useSelector((state: RootState) => state.auth.userData?.id)

     const { status } = useSubscrtiption(userId as string)

     return (
          <div className="w-full py-8 mt-4 text-center">
               <span className="text-5xl font-bold">
                    Simple Pricing,
                    <span className="text-gray-500">Multiple benefits</span>
               </span>
               <div className="container mx-auto p-8">
                    {!status ? (
                         <div className="flex flex-wrap justify-center">
                              {plans.map((plan, index) => (
                                   <PricingCard
                                        key={index}
                                        plan={plan}
                                        subStatus={status}
                                   />
                              ))}
                         </div>
                    ) : (
                         <div className="flex flex-wrap justify-center">
                              <PricingCard plan={plans[1]} subStatus={status} />
                         </div>
                    )}
               </div>
          </div>
     )
}
