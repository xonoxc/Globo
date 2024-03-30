import AppLogo from "../assets/Globo.svg"

const Logo = ({ width = "100px" }: { width: string }) => {
  return <img src={AppLogo} alt="Logo" width={width} className="h-20" />
}

export default Logo
