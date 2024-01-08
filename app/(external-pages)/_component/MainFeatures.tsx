"use client";

import { useEffect, useRef, useState } from "react";
import { classNames } from "@/utils/classNames";
import { Transition } from "@headlessui/react";
import { T } from "@/components/ui/Typography";
import Image from "next/image";

const MainFeatures = () => {
  const [tab, setTab] = useState<number>(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section className="relative w-full mb-24">
      <div className="relative px-4 md:container sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl pb-12 md:pb-16">
            <div className="mb-4 w-fit px-2 py-[2px]  border border-gray-300 bg-muted dark:bg-slate-800 dark:border-gray-700 rounded-lg shadow-sm ">
              <T.Small className="text-gray-600 dark:text-slate-400">
                Protocol Features
              </T.Small>
            </div>
            <h2 className="mb-5 text-4xl leading-[44px]  font-semibold text-gray-900 dark:text-white">
              Core Protocol Interactions
            </h2>
            <p className="text-gray-500 sm:text-xl sm:leading-[30px] dark:text-slate-400">
              The Incented Protocol is powering 4 core interactions needed to
              effectively manage any task or contribution. Proposition,
              Prioritization, Execution and Validation. Each stage is powered by
              a staking mechanism that is utilized to ensure that participation
              is additive to the value of the community
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div
              className="max-w-xl mx-auto my-auto md:max-w-none md:w-full md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className="flex items-center text-lg transition duration-300 ease-in-out rounded group"
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div
                    className={classNames(
                      "px-6 py-6 max-w-4xl md:max-w-xl rounded-xl transition duration-300 ease-in-out",
                      tab !== 1
                        ? "group-hover:cursor-pointer"
                        : "bg-gray-100 dark:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-center w-10 h-10 mb-4 border border-gray-300 rounded-lg dark:border-slate-700 bg-muted dark:bg-slate-800 bg-primary-100 dark:bg-primary-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        stroke="#000000"
                        className="lucide lucide-lightbulb dark:invert"
                      >
                        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                      </svg>
                    </div>
                    <T.P className="font-semibold text-xl leading-[30px] mb-2">
                      Proposal Stage
                    </T.P>
                    <T.P className="text-base text-gray-600 dark:text-slate-400">
                      The first step in the protocol is the submission of a task
                      proposals. Proposals can be in form of any kind of task.
                      E.g build a website, or create a marketing plan.
                    </T.P>
                  </div>
                </a>
                <a
                  className="flex items-center text-lg transition duration-300 ease-in-out rounded group"
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div
                    className={classNames(
                      "px-6 py-6 max-w-4xl md:max-w-xl rounded-xl transition duration-300 ease-in-out",
                      tab !== 2
                        ? "group-hover:cursor-pointer"
                        : "bg-gray-100 dark:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-center w-10 h-10 mb-4 border border-gray-300 rounded-lg dark:border-slate-700 bg-muted dark:bg-slate-800 bg-primary-100 dark:bg-primary-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        stroke="#000000"
                        className="lucide lucide-diff dark:invert"
                      >
                        <path d="M12 3v14" />
                        <path d="M5 10h14" />
                        <path d="M5 21h14" />
                      </svg>
                    </div>
                    <T.P className="font-semibold text-xl leading-[30px] mb-2">
                      Prioritization Stage
                    </T.P>
                    <T.P className="text-base text-gray-600 dark:text-slate-400">
                      Community members stake toward / against a proposal to
                      increase the weight of the tasks priority and therefore
                      signal what should be done next.
                    </T.P>
                  </div>
                </a>
                <a
                  className="flex items-center text-lg transition duration-300 ease-in-out rounded group"
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div
                    className={classNames(
                      "px-6 py-6 max-w-4xl md:max-w-xl rounded-xl transition duration-300 ease-in-out",
                      tab !== 3
                        ? "group-hover:cursor-pointer"
                        : "bg-gray-100 dark:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-center w-10 h-10 mb-4 border border-gray-300 rounded-lg dark:border-slate-700 bg-muted dark:bg-slate-800 bg-primary-100 dark:bg-primary-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-hammer dark:invert"
                      >
                        <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
                        <path d="M17.64 15 22 10.64" />
                        <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
                      </svg>
                    </div>
                    <T.P className="font-semibold text-xl leading-[30px] mb-2">
                      Contribution Stage
                    </T.P>
                    <T.P className="text-base text-gray-600 dark:text-slate-400">
                      Any member can decide to execute a prioritized tasks to
                      contribute with their skills. When they do so, they submit
                      a full solution to the original proposal.
                    </T.P>
                  </div>{" "}
                </a>
                <a
                  className="flex items-center text-lg transition duration-300 ease-in-out rounded group"
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(4);
                  }}
                >
                  <div
                    className={classNames(
                      "px-6 py-6 max-w-4xl md:max-w-xl rounded-xl transition duration-300 ease-in-out",
                      tab !== 4
                        ? "group-hover:cursor-pointer"
                        : "bg-gray-100 dark:bg-slate-800"
                    )}
                  >
                    <div className="flex items-center justify-center w-10 h-10 mb-4 border border-gray-300 rounded-lg dark:border-slate-700 bg-muted dark:bg-slate-800 bg-primary-100 dark:bg-primary-900">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-monitor-check dark:invert"
                      >
                        <path d="m9 10 2 2 4-4" />
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <path d="M12 17v4" />
                        <path d="M8 21h8" />
                      </svg>
                    </div>
                    <T.P className="font-semibold text-xl leading-[30px] mb-2">
                      Validation Stage
                    </T.P>
                    <T.P className="text-base text-gray-600 dark:text-slate-400">
                      To ensure high quality contributions, members review and
                      validate submissions by staking for / against them. By
                      assigning higher stakes they indicate their approval of
                      the quality.
                    </T.P>
                  </div>
                </a>
              </div>
            </div>

            {/* Tabs items */}
            <div className="max-w-xl mx-auto mb-8 md:max-w-none md:w-full md:col-span-5 lg:col-span-6 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative flex flex-col w-full overflow-hidden text-center rounded-xl lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  {/* Item 1 */}
                  <Transition
                    show={tab === 1}
                    appear={true}
                    className="w-full md:w-[640px] h-[256px] md:h-[640px] rounded-lg overflow-hidden"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="object-cover mx-auto md:max-w-none"
                        src="/mockups/proposal.png"
                        width={640}
                        height="640"
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                  {/* Item 2 */}
                  <Transition
                    show={tab === 2}
                    appear={true}
                    className="w-full md:w-[640px] h-[256px] md:h-[640px] rounded-lg overflow-hidden"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="object-cover mx-auto md:max-w-none "
                        src="/mockups/prioritizing.png"
                        width={640}
                        height={640}
                        alt="Features bg"
                      />
                    </div>
                  </Transition>

                  {/* Item 3 */}
                  <Transition
                    show={tab === 3}
                    appear={true}
                    className="w-full md:w-[640px] h-[256px] md:h-[640px] rounded-lg overflow-hidden"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="object-cover mx-auto md:max-w-none "
                        src="/mockups/contribute.png"
                        width={640}
                        height={640}
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                  {/* Item 4 */}
                  <Transition
                    show={tab === 4}
                    appear={true}
                    className="w-full md:w-[640px] h-[256px] md:h-[640px] rounded-lg overflow-hidden"
                    enter="transition ease-in-out duration-700 transform order-first"
                    enterFrom="opacity-0 translate-y-16"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in-out duration-300 transform absolute"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-16"
                    beforeEnter={() => heightFix()}
                    unmount={false}
                  >
                    <div className="relative inline-flex flex-col">
                      <Image
                        className="object-cover mx-auto md:max-w-none "
                        src="/mockups/validating2.png"
                        width={640}
                        height={640}
                        alt="Features bg"
                      />
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainFeatures;
