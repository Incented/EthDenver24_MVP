import { ChevronRightIcon } from "lucide-react";
import { T } from "@/components/ui/Typography";
import { Anchor } from "@/components/Anchor";
import { Button } from "../../ui/button";
import Image from "next/image";

type HeroSectionProps = {
  title: string;
  description: string;
  image?: string;
};

export default function HeroSection({
  title,
  description,
  image,
}: HeroSectionProps) {
  const imageSrc = image ? image : "/mockups/laptop.jpeg";
  return (
    <section className="mt-20 bg-background">
      <div className="grid px-4 mx-auto md:px-6 md:container lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="max-w-2xl mb-16 mr-auto space-y-6 place-self-center lg:col-span-7">
          <div className="flex flex-col items-start justify-start gap-4">
            <div className="flex gap-x-2 md:gap-x-3 border group items-center pr-2 border-gray-300 dark:border-gray-700 rounded-xl shadow-sm p-[2px]">
              <div className="flex items-center border border-gray-300 bg-muted dark:bg-slate-800 dark:border-gray-700 rounded-lg shadow-sm px-2 py-[2px]">
                <T.Small className="text-xs text-gray-600 md:text-sm dark:text-slate-400">
                  Lite Paper
                </T.Small>
              </div>
              <div className="flex items-center">
                <T.Small className="text-xs text-gray-600 md:text-sm dark:text-slate-400">
                  <Anchor href="http://protocol.incented.co/" target="_blank">
                    Read the current draft
                  </Anchor>
                </T.Small>
                <ChevronRightIcon className="w-5 h-5 transition group-hover:translate-x-1" />
              </div>
            </div>
            <h1 className="font-semibold max-w-2xl tracking-tight text-4xl leading-[44px] md:text-5xl xl:text-6xl xl:leading-[72px] text-gray-900 dark:text-slate-50">
              {title}
            </h1>
          </div>
          <p className="max-w-xl font-normal text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-slate-400">
            {description}
          </p>
          <div className="flex items-center gap-6 pt-4">
            <Anchor href="/login" className="">
              <Button
                size="lg"
                className="group mt-3 w-full md:w-fit bg-primary hover:bg-primary/95 dark:bg-primary dark:text-white dark:hover:bg-primary/95"
              >
                Log In
                <svg
                  className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition"
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
            <Anchor href="http://protocol.incented.co/" target="_blank">
              <Button variant="outline" size="lg" className="">
                Learn More
                <ChevronRightIcon className="ml-2 transition group-hover:translate-x-1" />
              </Button>
            </Anchor>
          </div>
        </div>
        <div className="lg:mt-0 lg:col-span-5 rounded-lg overflow-hidden h-[320px] md:h-[640px] md:w-full lg:flex">
          <Image
            src={imageSrc}
            layout="responsive"
            width={640}
            height={960}
            alt="mockup"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
