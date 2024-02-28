import CreateGrantForm from "./_components/CreateGrantForm";

export default function CreateGrantPage() {
  return (
    <main className="relative w-full overflow-x-hidden overflow-y-auto">
      <div className="mt-10">
        <div className="relative flex flex-col w-full gap-4">
          <div className="w-full">
            <CreateGrantForm />
          </div>
        </div>
      </div>
    </main>
  );
}
