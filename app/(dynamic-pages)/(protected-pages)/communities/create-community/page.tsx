import CreateCommunityForm from "./_components/CreateCommunityForm";

export default function CreateCommunityPage() {
  return (
    <div className="relative w-full overflow-auto">
      <div className="px-8 pt-0 w-full h-full md:overflow-y-hidden">
        <h1 className="mt-10 mb-4 text-3xl font-semibold ">Create Community</h1>
        <div className="relative max-w-4xl flex flex-col gap-4 w-full h-full">
          <div className="pb-0 md:pb-44 overflow-y-auto w-full">
            <CreateCommunityForm />
          </div>
        </div>
      </div>
    </div>
  );
}
