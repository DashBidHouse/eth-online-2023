import { Disclosure } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect();
    }
  }, [connect]);

  return (
    <Disclosure as="nav" className="bg-beige1 ">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="block h-8 w-auto sm:block lg:block"
                    src="/logo.svg"
                    width="24"
                    height="24"
                    alt="DashBid Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Home
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/auctionListPage"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Projects
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/auctionDetailPage"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Detail
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/auctionCreatePage"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Create Auction
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    href="/profilePage"
                    className="inline-flex items-center  px-1 pt-1 text-sm font-medium text-gray-900"
                  >
                    Profile
                  </Link>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!hideConnectBtn && (
                  <ConnectButton
                    showBalance={{ smallScreen: true, largeScreen: false }}
                  />
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              <Disclosure.Button
                as="a"
                href="#"
                className="block  py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/auctionListPage"
                className="block  py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/auctionDetailPage"
                className="block  py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Detail
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/auctionCreatePage"
                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Create Auction
              </Disclosure.Button>
              {/* Add here your custom menu elements */}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

declare global {
  interface Window {
    ethereum: any;
  }
}
