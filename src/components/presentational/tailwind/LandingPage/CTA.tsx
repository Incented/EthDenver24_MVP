import { Button } from '@/components/ui/Button';
import { Anchor } from '@/components/Anchor';

const CalltoActionSection = () => {
  return (
    <section className="bg-background mb-24">
      <div className="mx-auto md:container px-4 xl:px-6 md:px-6 sm:py-24">
        <div className="flex flex-col md:flex-row justify-between items-center w-full py-10 px-6 md:py-16 md:px-16 bg-gray-100 dark:bg-slate-800 rounded-xl">
          <div className=" max-w-3xl w-full">
            <h2 className="mb-5 text-3xl leading-[38px]  md:text-4xl md:leading-[44px] font-semibold text-gray-900 dark:text-white">
              Sign Up For News
            </h2>
            <p className="text-gray-500 text-lg md:text-xl md:leading-[30px] dark:text-slate-400">
              We would love to keep you updated on the protocol and app
              development. We believe in building in public and will
              periodically share updates as we go along.
            </p>
          </div>
          <Anchor
            href="https://blog.incented.co/#/portal/signup/"
            target="_blank"
            className="w-full md:w-fit"
          >
            <Button
              size="lg"
              className="group mt-3 w-full bg-primary hover:bg-primary/95"
            >
              <span>Sign Up</span>
              <svg
                className="ml-2 -mr-1 w-10 h-5 group-hover:translate-x-1 transition"
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
        </div>
      </div>
    </section>
  );
};

export default CalltoActionSection;
