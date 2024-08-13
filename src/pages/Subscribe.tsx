import { Container } from "lucide-react"
import React, { Suspense } from "react"

const PaymentComponent = React.lazy(
     () => import("../components/payment-form/PayFrom")
)

export default function Subscribe() {
     return (
          <div className="container">
               <Container>
                    <Suspense fallback={"loading..."}>
                         <PaymentComponent />
                    </Suspense>
               </Container>
          </div>
     )
}
