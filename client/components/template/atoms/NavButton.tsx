import { Button } from "@/components/ui/button";
import Link from "next/link";

import React, { FC, ReactNode } from "react";

type NavButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
};

const navButtonClass =
  "bg-white text-gray-900 py-2 px-3 rounded-lg font-medium hover:bg-amber-400";

const NavButton: FC<NavButtonProps> = ({
  children,
  onClick,
  href,
  ...props
}) => {
  if (href) {
    return (
      <Link href={href}>
        <Button className={navButtonClass} {...props}>
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <Button className={navButtonClass} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

export default NavButton;
