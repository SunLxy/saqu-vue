export interface SubMenusType {
  type: string;
  id: string;
  text: string;
}

export interface DocLayoutProps {
  /**子标题*/
  subMenus?: SubMenusType[];
  /**文档主标题*/
  title?: string;
}
