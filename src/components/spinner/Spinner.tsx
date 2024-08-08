import { CubeSpinner } from "react-spinners-kit"

const Spinner: React.FC = () => {
     return (
          <div className="flex items-center justify-center">
               <CubeSpinner size={30} color="#000000" />
          </div>
     )
}

export default Spinner
