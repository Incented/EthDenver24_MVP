import GoBack from "@/components/ui/GoBack";
import { getAllNamesOfGrantProjectTypes } from "@/data/user/grant-projects";
import { Suspense } from "react";
import { z } from "zod";
import { CreateGrantApplicationForm } from "./components/CreateGrantApplicationForm";

const paramsSchema = z.object({
  id: z.string(),
})

export default async function CreateGrantApplicationPage({ params }: { params: unknown }) {
  const parsedParams = paramsSchema.parse(params);
  const { id } = parsedParams;
  const grantProjectTypes = await getAllNamesOfGrantProjectTypes();
  return (
    <main className="relative mx-3 mb-40 sm:mx-6 xl:mx-60">
      <div className="mt-4 mb-6">
        <GoBack />
      </div>
      <h1 className="mb-8 text-3xl -tracking-[2.5%] font-semibold">
        Grant Application Form
      </h1>

      <Suspense fallback={<div>Loading...</div>}>
        <CreateGrantApplicationForm grantProjectTypes={grantProjectTypes} grantProgramId={id} />
      </Suspense>
    </main>
  );
}
