import { Link } from "react-router-dom"
import Logo from "../Logo"

const Footer: React.FC = () => {
     return (
          <footer className="relative py-10 bg-white border-t-2 border-t-black">
               <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                         <div className="w-full md:w-1/2 lg:w-1/3 p-6">
                              <div className="flex flex-col justify-between h-full">
                                   <Logo width="100px" />
                                   <p className="text-sm text-gray-600">
                                        &copy; 2023 DevUI. All Rights Reserved.
                                   </p>
                              </div>
                         </div>
                         <div className="w-full md:w-1/2 lg:w-1/3 p-6">
                              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-6">
                                   Company
                              </h3>
                              <ul>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Features
                                        </Link>
                                   </li>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Pricing
                                        </Link>
                                   </li>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Affiliate Program
                                        </Link>
                                   </li>
                                   <li>
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Press Kit
                                        </Link>
                                   </li>
                              </ul>
                         </div>
                         <div className="w-full md:w-1/2 lg:w-1/3 p-6">
                              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-6">
                                   Support
                              </h3>
                              <ul>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Account
                                        </Link>
                                   </li>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Help
                                        </Link>
                                   </li>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Contact Us
                                        </Link>
                                   </li>
                                   <li>
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Customer Support
                                        </Link>
                                   </li>
                              </ul>
                         </div>
                         <div className="w-full md:w-1/2 lg:w-1/3 p-6">
                              <h3 className="text-xs font-semibold uppercase text-gray-500 mb-6">
                                   Legals
                              </h3>
                              <ul>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Terms & Conditions
                                        </Link>
                                   </li>
                                   <li className="mb-4">
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Privacy Policy
                                        </Link>
                                   </li>
                                   <li>
                                        <Link
                                             className="text-base font-medium text-gray-900 hover:text-gray-700"
                                             to="/"
                                        >
                                             Licensing
                                        </Link>
                                   </li>
                              </ul>
                         </div>
                    </div>
               </div>
          </footer>
     )
}

export default Footer
