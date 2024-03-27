import SidebarWithLogo from "../../../Components/Admin/Sidebar"

const Home = () => {
  return (
    <div className="flex"> {/* Use flexbox for side-by-side layout */}
      <SidebarWithLogo />  {/* Render the sidebar */}
      <main className="flex-grow px-4 py-8 z-index-2"> {/* Main content area with z-index */}
        <p>Dashboard</p>  {/* Display the "Dashboard" text */}
      </main>
    </div>
  )
}

export default Home