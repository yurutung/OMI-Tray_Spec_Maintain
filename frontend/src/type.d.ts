interface IMenu {
    expanded: boolean
    id: string
    leaf: boolean
    roles: string
    text: string
    url: string
    children?: Array<IMenu>
}