import SidebarWithLogo from "../../../Components/Admin/Sidebar"
import Property from '../../../Components/Admin/Property'

const PropertyPage = () => {
  return (
    <div className="flex">
    <div className="w-1/4">
      <SidebarWithLogo />
    </div>
    <div className="mt-20">
      <Property/>
    </div>
  </div>
  )
}

export default PropertyPage
