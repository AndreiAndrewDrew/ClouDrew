/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navItems } from '@/constants';
import FileUploader from './FileUploader';
import { Button } from './ui/button';
import { singnOutUser } from '@/lib/actions/user.actions';

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="mobile-header">
      <Link href="/" className="block w-fit self-center">
        <Image
          src="/assets/icons/logo-full-brand-2.svg"
          alt="logo"
          width={180}
          height={52}
          className="block"
          loading="eager"
          priority
        />
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="cursor-pointer">
            <Image
              src="/assets/icons/menu.svg"
              alt="menu"
              width={30}
              height={30}
            />
          </button>
        </SheetTrigger>

        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user mb-4">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />

              <div>
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>

            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <SheetDescription className="sr-only">
            Mobile navigation links and actions
          </SheetDescription>

          {/* NAV */}
          <nav className="mobile-nav">
            <ul className="flex flex-col gap-2">
              {navItems.map(({ url, name, icon }) => {
                const isActive = pathname === url;

                return (
                  <li key={name}>
                    <Link
                      href={url}
                      className={cn(
                        'mobile-nav-item flex items-center gap-3',
                        isActive && 'shad-active-mobile',
                      )}
                    >
                      <Image
                        src={icon}
                        alt={name}
                        width={24}
                        height={24}
                        className={cn(
                          'nav-icon',
                          isActive && 'nav-icon-active',
                        )}
                      />

                      <span>{name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Separator className="my-4 bg-light-200/20" />

          {/* ACTIONS */}
          <div className="flex flex-col gap-4 pb-5">
            <FileUploader
              ownerId={ownerId}
              accountId={accountId}
              className={''}
            />

            <Button className="mobile-sign-out-button" onClick={singnOutUser}>
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <span>Logout</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
