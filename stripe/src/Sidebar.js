import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from './context'
import sublinks from './data'
//in case of small screens
const Sidebar = () => {
  //state from the global context
  const { isSidebarOpen, closeSidebar } = useGlobalContext()
  return (
    //conditional rendering for showing sidebar
    <div
      className={`${isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
        }`}
    >
      <aside className='sidebar'>
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />
        </button>
        {/* looping twice as we have a list of objects inside a list of objects */}
        <div className='sidebar-links'>
          {/* shows the category labels, level 1 */}
          {sublinks.map((item, index) => {
            const { links, page } = item
            return (
              <article key={index}>
                <h4>{page}</h4>
                <div className='sidebar-sublinks'>
                  {/* shows the links of the category, level 2 */}
                  {links.map((link, index) => {
                    const { url, icon, label } = link
                    return (
                      <a key={index} href={url}>
                        {icon}
                        {label}
                      </a>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
