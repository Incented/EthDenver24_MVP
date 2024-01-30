import CreateCommunityForm from "./_components/CreateCommunityForm";

export default function CreateCommunityPage() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="mt-10">
        <div className="relative flex flex-col gap-4 w-full">
          <div className="w-full">
            <CreateCommunityForm />
          </div>
        </div>
      </div>
    </div>
  );
}
