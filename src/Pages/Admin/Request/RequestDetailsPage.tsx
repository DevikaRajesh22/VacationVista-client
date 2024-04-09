import SidebarWithLogo from "../../../Components/Admin/Sidebar"
import RequestDetails from "../../../Components/Admin/RequestDetails"

const RequestDetailsPage= () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        <SidebarWithLogo />
      </div>
      <div className="mt-20">
        <RequestDetails/>
      </div>
    </div>
  )
}

export default RequestDetailsPage
