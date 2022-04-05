import React from 'react';
import {ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent} from 'react-pro-sidebar';
import {Link} from "react-router-dom";

type SideBarProps = {
  toggled: boolean
  handleToggleSidebar: (value: boolean) => void
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const {toggled, handleToggleSidebar} = props;

  return (
    <ProSidebar image={undefined} rtl={false} collapsed={false} toggled={toggled} breakPoint="lg"
                onToggle={(value) => handleToggleSidebar(value)}>
      <SidebarHeader className='py-4'>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem>
            <Link className='nav-link' to={'/admin'}>Create Product</Link>
          </MenuItem>
          <MenuItem>
            <Link className='nav-link' to={'/admin/adminProductList'}>Product List</Link>
          </MenuItem>
          <MenuItem>
            <Link className='nav-link' to={'/admin/orders'}>Orders</Link>
          </MenuItem>
          <MenuItem>
            <Link className='nav-link' to={'/admin/coupons'}>Coupons</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
};

export default SideBar;