"use client";
import { ThemeToggle } from "@/components/presentational/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import acmeLightLogo from "@/public/logos/ico.svg";
import acmeDarkLogo from "@/public/logos/ico.svg";
import { Button } from "@/components/ui/button";
import { classNames } from "@/utils/classNames";
import { usePathname } from "next/navigation";
import { Anchor } from "@/components/Anchor";
import { Menu } from "lucide-react";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export function ExternalNavigation() {
  const pathname = usePathname();

  const isDocs = pathname ? pathname.startsWith("/docs") : false;

  const navigation: Array<{
    name: string;
    href: string;
    target: string;
  }> = useMemo(() => {
    const nav = [
      { name: "Docs", href: "https://protocol.incented.co/", target: "_blank" },
      { name: "Blog", href: "https://blog.incented.co/", target: "_blank" },
    ];

    return nav;
  }, []);

  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/90 border-gray-200/20 dark:border-gray-700/40 backdrop-blur">
      <div className="inset-0" />
      <nav
        className="flex items-center w-full h-[54px] md:container justify-between px-6 md:px-8"
        aria-label="Global"
      >
        <div className="flex space-x-8">
          <Link
            href="/"
            className={classNames(
              "font-bold text-xl ",
              isDocs ? "hidden md:block" : ""
            )}
          >
            <div className="relative flex items-center justify-center w-10 h-10 -ml-2 space-x-2 text-black md:w-fit dark:text-white dark:-ml-4">
              <Image
                src={acmeLightLogo}
                width={40}
                height={40}
                alt="logo"
                className="block w-8 h-8 dark:hidden"
              />
              <Image
                src={acmeDarkLogo}
                width={40}
                height={40}
                alt="logo"
                className="hidden w-8 h-8 dark:invert dark:block"
              />
              <span className="hidden font-bold text-black dark:invert lg:inline-block">
                Incented
              </span>
            </div>
          </Link>
        </div>

        <ul className="items-center hidden gap-8 -ml-24 font-medium lg:flex">
          {navigation.map(({ name, href, target }) => (
            <li
              key={name}
              className="text-sm text-gray-500 dark:text-gray-300 font-regular hover:text-gray-800 dark:hover:text-gray-500"
            >
              <Link href={href} target={target}>
                {name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-10 lg:-mr-2">
          <ThemeToggle />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="-mr-2 hover:cursor-pointer lg:hidden" />
          </SheetTrigger>
          <SheetContent side="left">
            <ul className="flex flex-col items-start w-full py-2 pb-2 font-medium">
              {navigation.map(({ name, href, target }) => (
                <li
                  key={name}
                  className="px-4 py-2 text-gray-900 rounded-lg dark:text-gray-300"
                >
                  <Link href={href} target={target}>
                    {name}
                  </Link>
                </li>
              ))}
              <hr className="w-full h-2" />
              <Anchor href="/login" className="w-full px-4">
                <Button
                  variant="default"
                  size="default"
                  className="w-full group"
                >
                  Log In
                  <svg
                    className="w-5 h-5 ml-2 -mr-1 transition group-hover:translate-x-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </Anchor>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
