import CreateCommunityForm from "./_components/CreateCommunityForm";

export default function CreateCommunityPage() {
  return (
    <main className="relative w-full overflow-x-hidden overflow-y-scroll">
      <div className="mt-10">
        <div className="relative flex flex-col w-full gap-4">
          <div className="w-full">
            <CreateCommunityForm />
          </div>
        </div>
      </div>
    </main>
  );
}
