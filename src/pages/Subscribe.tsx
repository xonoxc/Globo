import React, { Suspense } from "react"
import { Container } from "../components"
import { Button } from "../components"
import { useNavigate } from "react-router-dom"
import { MoveLeft } from "lucide-react"
import Spinner from "../components/spinner/Spinner"

const PaymentComponent = React.lazy(
     () => import("../components/payment-form/PayFrom")
)

export default function Subscribe() {
     const navigate = useNavigate()

     return (
          <Container>
               <div className="container py-8 my-16 ">
                    <Container>
                         <div className="back w-1/4">
                              <Button
                                   className="md:w-1/3 w-1/2 flex  items-center justify-center bg-transparent font-bold gap-2"
                                   onClick={() => navigate("/pricing")}
                              >
                                   <MoveLeft size={15} fontWeight={800} />
                                   Back
                              </Button>
                         </div>
                         <Suspense fallback={<Spinner />}>
                              <PaymentComponent />
                         </Suspense>
                    </Container>
               </div>
          </Container>
     )
}
