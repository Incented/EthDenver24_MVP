import GrantProject from "@/app/(dynamic-pages)/(protected-pages)/grant-applications/[id]/_components/GrantProject";
import { getGrantProjectById } from "@/data/user/grant-projects";
import { z } from "zod";

const paramsSchema = z.object({
    id: z.string(),
    project_id: z.string(),
});

export default async function GrantProjectPage({
    params
}: {
    params: unknown;
}) {
    const parsedParams = paramsSchema.parse(params);
    const { id, project_id } = parsedParams;
    const grantProject = await getGrantProjectById(project_id);
    return <main>
        <GrantProject grantProject={grantProject} />
    </main>
}