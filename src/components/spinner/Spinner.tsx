import { CircleSpinner } from "react-spinners-kit"

const Spinner: React.FC = () => {
     return (
          <div className="flex items-center justify-center text-black">
               <CircleSpinner size={30} color="#ccccccc" />
          </div>
     )
}

export default Spinner
