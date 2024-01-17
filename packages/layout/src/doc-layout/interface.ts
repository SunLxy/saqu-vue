export interface SubMenusType {
  type: string;
  id: string;
  text: string;
}

export interface DocLayoutProps {
  subMenus: SubMenusType[];
}
