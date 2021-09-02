import { forwardRef, useImperativeHandle, useState } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
// css
import 'react-pro-sidebar/dist/css/styles.css'



const SideBar = forwardRef(({ toggled, handleToggleSidebar, handleOpenUrl }: any, ref) => {
    const [menuHtml, setMenuHtml] = useState<Array<JSX.Element>>([])

    useImperativeHandle(
        ref,
        () => ({
            refHandleMenuHtml(menu: Array<IMenu>) {
                handleMenuHtml(menu)
            }
        })
    )
    const handleMenuHtml = (menu: Array<IMenu>) => {
        const menuTemp = []
        for (let i = 0; i < menu.length; i++)
            menuTemp.push(getMenu(menu[i]))
        setMenuHtml(menuTemp)
    }
    const getMenu = (m: IMenu): JSX.Element => {
        if (m.leaf) {
            return <MenuItem key={m.id} onClick={() => handleOpenUrl(m.url)}>{m.text}</MenuItem>
        } else {
            const childrenObj = m.children || []
            const children = []
            for (let i = 0; i < childrenObj.length; i++)
                children.push(getMenu(childrenObj[i]))
            return <SubMenu key={m.id} title={m.text}>{children}</SubMenu>
        }
    }

    return (
        <>
            <ProSidebar
                breakPoint="xl"
                toggled={toggled}
                onToggle={handleToggleSidebar}
            >
                <Menu>
                    <MenuItem key='home' onClick={() => handleOpenUrl('')}>Home</MenuItem>
                    {menuHtml}
                </Menu>
            </ProSidebar>
        </>
    )
})

export default SideBar