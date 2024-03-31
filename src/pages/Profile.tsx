import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { userData } from "../types"

export default function Profile(): JSX.Element {
     const userDataSelector = (state: RootState) => state.auth.userData

     const userData = useSelector((state: RootState) => {
          const data = userDataSelector(state)
          if (data != null) {
               return data as userData
          } else {
               throw new Error("[postFormError] :User data not found!")
          }
     })

     return (
          <div className="container mx-auto py-8">
               <div className="text-center mb-8">
                    <h2 className="text-3xl font-semibold">Profile</h2>
               </div>
               <div className="flex justify-center items-center">
                    <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
                         <div className="p-4">
                              <div className="flex justify-center">
                                   <img
                                        src={"#"}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full"
                                   />
                              </div>
                              <div className="mt-4">
                                   <div className="flex flex-col mb-4">
                                        <label className="font-semibold mb-1">
                                             Username:
                                        </label>
                                        <span>{userData.name}</span>
                                   </div>
                                   <div className="flex flex-col mb-4">
                                        <label className="font-semibold mb-1">
                                             User ID:
                                        </label>
                                        <span>{userData.$id}</span>
                                   </div>
                                   <div className="flex flex-col mb-4">
                                        <label className="font-semibold mb-1">
                                             Email:
                                        </label>
                                        <span>{userData.email}</span>
                                   </div>

                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}
