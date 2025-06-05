"use client";
import React from "react";
import Image from "next/image";

interface MenuItemProps {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: MenuItemProps) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <div className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white hover:border-b-2 hover:border-black dark:hover:border-white transition-all duration-300">
        {item}
      </div>
      {active !== null && active === item && (
        <div
          className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 opacity-100 scale-100 translate-y-0 transition-all duration-300"
          style={{
            opacity: active === item ? 1 : 0,
            transform:
              active === item
                ? "translateX(-50%) translateY(0) scale(1)"
                : "translateX(-50%) translateY(10px) scale(0.85)",
          }}
        >
          <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
            <div className="w-max h-full p-4">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MenuProps {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}

export const Menu = ({ setActive, children }: MenuProps) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

interface ProductItemProps {
  title: string;
  description: string;
  href: string;
  src: string;
}

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: ProductItemProps) => {
  return (
    <a href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

interface HoveredLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

export const HoveredLink = ({ children, ...rest }: HoveredLinkProps) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </a>
  );
};
