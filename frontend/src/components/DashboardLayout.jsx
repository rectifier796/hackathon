

import NavBar from './NavBar'

const DashboardLayout = ({children}) => {
  return (
    <div className='flex justify-between'>
      <NavBar />
      <div className='flex-grow'>
      {children}
      </div>
    </div>
  )
}


export default DashboardLayout
