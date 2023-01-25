type Button = {
  icon: JSX.Element;
  action: () => void;
};

export type ExpandedListProps = {
  title: string;
  items: JSX.Element[];
  buttons: Button[];
};
