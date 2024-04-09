import SidebarWithLogo from "../../../Components/Admin/Sidebar"
import Host from '../../../Components/Admin/Host'

const HostPage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SidebarWithLogo />
      </div>
      <div className="mt-20">
        <Host/>
      </div>
    </div>
  )
}

export default HostPage
