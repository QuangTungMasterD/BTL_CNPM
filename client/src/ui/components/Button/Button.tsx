import clsx from "clsx";
import Link from "next/link";

function Button({
  children,
  size = 'md',
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  classNames = '',
  ...prop
}: {
  children: React.ReactNode;
  size?: "sm" | 'md' | "lg" | "xl";
  variant?: 'primary' | 'danger' | 'outline' | 'underline' | 'link',
  href?: string, 
  type?: 'button' | 'submit',
  classNames?: string,
  onClick?: () => void
}) {

  
  let Com: React.ElementType = 'button';
  const props = {
    ...prop,
    onClick
  }
  if(href) {
    Com = Link;
    props.href = href;
    delete props.onClick;
  }

  return <Com type={type} {...props} className={clsx(
    "cursor-pointer inline-block",
    variant == 'primary' && 'bg-[var(--primary-color)] text-white border border-[1px] border-[var(--primary-color)] hover:text-[var(--primary-color)] hover:bg-[var(--primary-color-op15)]',
    variant == 'underline' && 'no-underline hover:underline',
    variant == 'danger' && 'bg-red-600 text-white hover:bg-red-500',
    size == 'sm' && 'px-3 py-1 text-sm rounded-sm',
    size == 'md' && 'px-4 py-2 text-md rounded-md',
    size == 'lg' && 'px-5 py-3 text-md rounded-md',
    size == 'xl' && 'px-6 py-4 text-md rounded-md',
    classNames && classNames
  )}>{children}</Com>;
}

export default Button;
