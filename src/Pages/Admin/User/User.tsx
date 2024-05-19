import SidebarWithLogo from "../../../Components/Admin/Sidebar"
import Users from '../../../Components/Admin/User'

const User = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SidebarWithLogo />
      </div>
      <div className="mt-20">
        <Users />
      </div>
    </div>
  )
}

export default User
