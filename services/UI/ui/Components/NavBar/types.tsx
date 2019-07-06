export interface NavItemType {
  label: string;

  path: string;

  children?: NavItemType[];
}
