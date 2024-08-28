import { useState } from "react"
import { Sparkles, WandSparkles } from "lucide-react"
import { Button } from "../components"
import Spinner from "../components/spinner/Spinner"
import { completion } from "../services/completion"

interface SummerizeProps {
     content: string
}

const Summerize: React.FC<SummerizeProps> = ({ content }) => {
     const [points, setPoints] = useState<string[]>([])
     const [loading, setLoading] = useState<boolean>(false)
     const [error, setError] = useState<string>("")
     const [retryStatus, setRetryStatus] = useState<boolean>(false)
     const [success, setSuccess] = useState<boolean>(false)

     const fetchCompletion = async () => {
          setError("")
          setLoading(true)
          setPoints([])
          setSuccess(false)

          try {
               const response = await completion.getSummery(
                    content,
                    retryStatus
               )
               const parsedResponse = completion.parsestreamResponse(response)

               if (!parsedResponse || parsedResponse.length === 0) {
                    setRetryStatus(true)
               } else {
                    setRetryStatus(false)
                    setPoints(parsedResponse)
                    setSuccess(true)
               }
          } catch (error) {
               console.error(`Error while fetching completions: ${error}`)
               setError("An error occurred while fetching the summary.")
          } finally {
               setLoading(false)
          }
     }

     return (
          <div className="max-w-2xl min-w-full py-6 font-medium">
               {!success && (
                    <div className="tools w-full border-b-2 pb-2">
                         <div className="flex px-1 items-center justify-start md:w-[20%]">
                              <Button
                                   className="font-bold flex flex-row gap-2 justify-center"
                                   textColor="white"
                                   onClick={fetchCompletion}
                              >
                                   {retryStatus ? (
                                        <>
                                             Retry
                                             <WandSparkles />
                                        </>
                                   ) : (
                                        <>
                                             Generate Summary
                                             <WandSparkles />
                                        </>
                                   )}
                              </Button>
                         </div>
                    </div>
               )}

               {loading && (
                    <p className="text-gray-500 italic mb-4">
                         <Spinner className="text-black" />
                    </p>
               )}

               {error && (
                    <p className="text-black-500 bg-gray-200 p-3 rounded-md mb-4">
                         {error}
                    </p>
               )}

               {success && points.length > 0 && (
                    <div className="flex flex-col gap-2">
                         <span className="text-xl mb-4 font-bold border-b-2 mx-4">
                              Summary:
                         </span>
                         <ul className="space-y-3">
                              {points.map((point, index) => (
                                   <li
                                        key={index}
                                        className="bg-gray-50 border-l-4 flex gap-2 border-black p-4 rounded-r-md shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-50 animate-fade-in mx-4"
                                        style={{
                                             animationDelay: `${index * 100}ms`,
                                        }}
                                   >
                                        <Sparkles />
                                        {point}
                                   </li>
                              ))}
                         </ul>
                    </div>
               )}
          </div>
     )
}

export default Summerize
