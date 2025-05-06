type FooterLinkProps = {
  href: string;
  label: string;
  icon?: React.ReactNode;
  target?: string;
};

const FooterLink = ({
  href,
  icon,
  label,
  target = "_blank",
}: FooterLinkProps) => {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2"
      aria-label={label}
    >
      {icon}
      {label}
    </a>
  );
};

export default FooterLink;

export const withListItem = (Component: React.FC<FooterLinkProps>) => {
  const WrappedComponent = (props: FooterLinkProps) => (
    <li>
      <Component {...props} />
    </li>
  );
  WrappedComponent.displayName = `WithListItem(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};
