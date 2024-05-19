import SidebarWithLogo from "../../../Components/Admin/Sidebar"
import Request from "../../../Components/Admin/Request"

const RequestPage = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SidebarWithLogo />
      </div>
      <div className="mt-20">
        <Request />
      </div>
    </div>
  )
}

export default RequestPage
