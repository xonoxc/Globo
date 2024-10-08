import { Share2 } from "lucide-react"
import { Button } from "../components"

const ShareButton = ({
     done,
     className,
}: {
     done: () => void
     className?: string
}) => {
     const getPageUrl = () => window.location.href

     const handleClick = () => {
          console.log("share clicked")
          navigator.clipboard.writeText(getPageUrl())
          done()
     }

     return (
          <Button
               onClick={handleClick}
               className={
                    className
                         ? `${className} `
                         : `text-white flex items-center justify-center mt-2 py-3 mb-2 gap-1`
               }
          >
               <Share2 size={18} fontWeight={1000} />
               <span className="hidden md:block text-sm">Share</span>
          </Button>
     )
}

export default ShareButton
