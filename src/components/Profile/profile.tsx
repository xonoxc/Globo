import { Link } from "react-router-dom"

const Profile = () => {
     // Sample user data
     const user = {
          username: "john_doe",
          email: "john.doe@example.com",
          website: "https://johndoe.com",
          twitter: "johndoe",
          github: "johndoe",
          bio: "Web developer passionate about React and frontend technologies.",
     }

     return (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
               <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-sm w-full mx-4 sm:mx-auto">
                    <div className="p-8">
                         <div className="text-center">
                              <h1 className="text-2xl font-bold text-gray-800">
                                   {user.username}
                              </h1>
                              <p className="text-sm text-gray-600 mt-2">
                                   {user.bio}
                              </p>
                         </div>
                         <div className="mt-6">
                              <ul className="space-y-3">
                                   <li className="flex items-center">
                                        <span className="text-gray-600">
                                             {user.email}
                                        </span>
                                   </li>
                                   <li className="flex items-center">
                                        <a
                                             href={user.website}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                                        >
                                             {user.website}
                                        </a>
                                   </li>
                                   <li className="flex items-center">
                                        <a
                                             href={`https://twitter.com/${user.twitter}`}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                                        >
                                             @{user.twitter}
                                        </a>
                                   </li>
                                   <li className="flex items-center">
                                        <a
                                             href={`https://github.com/${user.github}`}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                                        >
                                             {user.github}
                                        </a>
                                   </li>
                              </ul>
                         </div>
                    </div>
                    <div className="bg-gray-200 py-4 px-8 rounded-b-lg flex justify-center">
                         <Link
                              to="/edit-profile"
                              className="text-gray-700 font-medium hover:text-gray-900 transition-colors duration-300"
                         >
                              Edit Profile
                         </Link>
                    </div>
               </div>
          </div>
     )
}

export default Profile
