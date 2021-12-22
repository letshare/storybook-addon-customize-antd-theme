import * as React from 'react';
import { Divider, ItemGroup, MenuProps as RcMenuProps } from 'rc-menu';
import SubMenu, { SubMenuProps } from './SubMenu';
import Item, { MenuItemProps } from './MenuItem';
import { MenuTheme } from './MenuContext';
export { MenuItemGroupProps } from 'rc-menu';
export declare type MenuMode = 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
export interface MenuProps extends RcMenuProps {
    theme?: MenuTheme;
    inlineIndent?: number;
}
declare class Menu extends React.Component<MenuProps, {}> {
    static Divider: typeof Divider;
    static Item: typeof Item;
    static SubMenu: typeof SubMenu;
    static ItemGroup: typeof ItemGroup;
    render(): JSX.Element;
}
export { MenuTheme, SubMenuProps, MenuItemProps };
export default Menu;
