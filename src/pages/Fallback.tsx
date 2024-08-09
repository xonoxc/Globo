import React from "react"
import { Container } from "../components"

const Fallback: React.FC = () => {
     return (
          <div className="w-full py-8 mt-4 text-center h-1/2">
               <Container>
                    <div className="flex flex-wrap">
                         <div className="p-2 w-full">
                              <h1 className="text-2xl font-bold hover:text-gray-500 flex items-center justify-center flex-col gap-2">
                                   <h2>Ahh ! fish ... </h2>
                                   <p className="font-bold uppercase">
                                        Something went wrong
                                   </p>
                              </h1>
                         </div>
                    </div>
               </Container>
          </div>
     )
}

export default Fallback
