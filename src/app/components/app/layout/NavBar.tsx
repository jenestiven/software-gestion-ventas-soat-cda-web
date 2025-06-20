import { Tooltip } from 'antd';
import Link from 'next/link';
import React from 'react'

type AppRoute = {
  path: string;
  handle?: {
    title?: string;
    navIcon?: React.ComponentType<{ className?: string }>;
    isChildren?: boolean;
  };
};

type Props = {}

const keyPathName = 'selectedPath';

export default function NavBar({}: Props) {
    const appRoutes: AppRoute[] = [
        {
            path: 'home',
            handle: {
                title: 'Home',  
                navIcon: () => <span className="icon-home" />,
                isChildren: false
            },
        }
    ];

  return (
    <nav className="layout-nav">
      <ul className="nav-list">
        {appRoutes?.map((route, index) => {
          const { path, handle } = route;

          if (!handle || handle?.isChildren) {
            return null;
                  href={`/${path}`}
                  className={`nav-list-item${isSelected}`}
                  onClick={() => {
                    localStorage.setItem(keyPathName, path);
                  }}
            : "";

          return (
            <li key={index}>
              <Tooltip title={title ?? ""} placement="right">
                <Link
                  to={`/${path}`}
                  className={`nav-list-item${isSelected}`}
                  onClick={() => {
                    localStorage.setItem(keyPathName, path);
                  }}
                >
                  {NavIcon && <NavIcon className="item-icon" />}
                  <span className="item-title">{title}</span>
                </Link>
              </Tooltip>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}