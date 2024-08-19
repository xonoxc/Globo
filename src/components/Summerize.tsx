import { completion } from "../services/completion"
import React, { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

interface SummerizeProps {
     content: string
     trigger: boolean
     onComplete: () => void
}

const Summerize: React.FC<SummerizeProps> = ({
     content,
     trigger,
     onComplete,
}) => {
     const [points, setPoints] = useState<string[] | []>([])
     const [loading, setLoading] = useState<boolean>(false)
     const [error, setError] = useState<string>("")

     useEffect(() => {
          if (trigger) {
               fetchCompletion()
          }
     }, [trigger, content])

     const fetchCompletion = async () => {
          setError("")
          setLoading(true)
          setPoints([])
          try {
               const response = await completion.getSummery(content)

               setPoints(completion.parsestreamResponse(response))
          } catch (error) {
               console.error(`Error while fetching completions: ${error}`)
               setError("An error occurred while fetching the summary.")
          } finally {
               setLoading(false)
               onComplete()
          }
     }

     return (
          <div className="max-w-2xl p-6 font-medium">
               <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-black-500 pb-2 mb-4">
                    Summary
               </h2>
               {loading && (
                    <p className="text-gray-500 italic mb-4">
                         Generating summary...
                    </p>
               )}
               {error && (
                    <p className="text-black-500 bg-gray-200 p-3 rounded-md mb-4">
                         {error}
                    </p>
               )}
               <ul className="space-y-3">
                    {points.map((point, index) => (
                         <li
                              key={index}
                              className="bg-gray-50 border-l-4 flex gap-2 border-black p-4 rounded-r-md shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-50 animate-fade-in"
                              style={{ animationDelay: `${index * 100}ms` }}
                         >
                              <Sparkles />
                              {point}
                         </li>
                    ))}
               </ul>
          </div>
     )
}

export default Summerize
