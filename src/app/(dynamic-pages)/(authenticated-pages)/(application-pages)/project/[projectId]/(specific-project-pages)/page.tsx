import { T } from '@/components/ui/Typography';
import { CommentInput } from './CommentInput';
import LayersIcon from 'lucide-react/dist/esm/icons/layers';
import { z } from 'zod';
import { Suspense } from 'react';
import { ProjectComments } from './ProjectComments';

const paramsSchema = z.object({
  projectId: z.string(),
});

export default function ProjectPage({ params }: { params: unknown }) {
  const { projectId } = paramsSchema.parse(params);
  return (
    <div className="space-y-6">
      <div className="mb-10">
        <div
          className="border dotted-bg dark:dotted-bg-dark border-gray-400/50 dark:border-gray-600/50 bg-gray-200/20 dark:bg-slate-950/40 h-[1024px] flex justify-center items-center"
          style={{}}
        >
          <div style={{ width: '100%', height: '100%' }}>
            <iframe 
              style={{ width: '100%', height: '100%', border: '1px solid rgba(0, 0, 0, 0.1)' }} 
              src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FLZTjU8MhinZAht0wXsW1GF%2FIncented-Prototype%3Ftype%3Ddesign%26node-id%3D642-10917%26t%3DlgREVljb0qhhwQIy-1%26scaling%3Dscale-down-width%26page-id%3D441%253A1561%26starting-point-node-id%3D642%253A10917%26mode%3Ddesign%26hide-ui%3D1"
              allowFullScreen 
            />
          </div>
        </div>
        <div className="space-y-4 max-w-md">
          <T.H4>Comments</T.H4>
          <div className="space-y-2 mb-10">
            <div className="space-y-4 mt-4 mb-10">
              <CommentInput projectId={projectId}></CommentInput>
              <Suspense>
                <ProjectComments projectId={projectId} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
