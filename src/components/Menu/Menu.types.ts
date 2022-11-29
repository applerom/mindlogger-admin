type MenuItem = {
  icon?: JSX.Element;
  title: string;
  action: (context?: unknown) => void | unknown;
};

export type MenuProps = {
  title?: string;
  anchorEl: null | HTMLElement;
  onClose: () => void;
  menuItems: MenuItem[];
  context?: unknown;
};
