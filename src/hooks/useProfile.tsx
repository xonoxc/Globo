import { IUserProfile } from "@/types/apiResponse"
import {
     Dispatch,
     SetStateAction,
     createContext,
     useContext,
     useEffect,
     useState,
} from "react"
import { useSelector } from "react-redux"
import { authService } from "../services/auth"
import { RootState } from "@/store/store"

interface ProfileContextProps {
     profile: IUserProfile | null
     isAuthor: boolean
     loading: boolean
     setLoading: Dispatch<SetStateAction<boolean>>
     fetchUserProfile: (userId: string) => Promise<void>
}

interface PCProviderProps {
     children: React.ReactNode
}

const ProfileContext = createContext<ProfileContextProps | null>(null)

export const ProfileContextProvider = ({ children }: PCProviderProps) => {
     const [profile, setProfile] = useState<IUserProfile | null>(null)
     const [isAuthor, setIsAuthor] = useState<boolean>(false)
     const [loading, setLoading] = useState<boolean>(false)

     const loggedInUserId = useSelector(
          (state: RootState) => state.auth.userData?.id
     )

     const fetchUserProfile = async (userId: string) => {
          try {
               setLoading(true)
               const response = await authService.getUserProfile(
                    userId as string
               )
               setIsAuthor(loggedInUserId === userId)
               if (response) setProfile(response)
          } catch (error) {
               console.error("error while feching profile:", error)
               setProfile(null)
          } finally {
               setLoading(false)
          }
     }

     return (
          <ProfileContext.Provider
               value={{
                    fetchUserProfile,
                    isAuthor,
                    profile,
                    setLoading,
                    loading,
               }}
          >
               {children}
          </ProfileContext.Provider>
     )
}

export const useProfile = (userId: string) => {
     const context = useContext(ProfileContext)

     if (!context) {
          throw new Error("useProfile must be used within a ProfileProvider")
     }

     const { fetchUserProfile, isAuthor, profile, loading, setLoading } =
          context

     useEffect(() => {
          ;(async () => {
               if (userId && !profile) {
                    await fetchUserProfile(userId)
               }
          })()
     }, [userId, fetchUserProfile])

     return {
          isAuthor,
          profile,
          loading,
          setLoading,
          fetchUserProfile,
     }
}
