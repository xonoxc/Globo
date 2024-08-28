import { MetroSpinner } from "react-spinners-kit"

const Spinner: React.FC<{ className: string }> = ({ className }) => {
     return (
          <div className={`flex items-center justify-center  ${className}`}>
               <MetroSpinner />
          </div>
     )
}

export default Spinner
