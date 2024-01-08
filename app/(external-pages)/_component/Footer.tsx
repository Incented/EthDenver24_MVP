import Image from "next/image";
import logo from "@/public/logos/ico.svg";

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-50 sm:p-6 dark:bg-muted-foreground/5">
      <div className="pt-2 mx-auto md:container md:pt-4">
        <div className="pb-2 md:flex md:justify-between md:pb-4">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <Image
                src={logo}
                className="block h-8 mr-3 dark:hidden"
                width={32}
                height={32}
                alt="Incented Logo"
              />
              <Image
                src={logo}
                className="hidden h-8 mr-3 invert dark:block"
                width={32}
                height={32}
                alt="Incented Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Incented
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/incented"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/getincented"
                    className="hover:underline"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="/terms" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://incented.co" className="hover:underline">
              Incented
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
