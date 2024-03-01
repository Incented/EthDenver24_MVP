import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export function MilestonePrioritizerCard(detail: { full_name: string | null; avatar_url: string | null; count: number; created_at: string; user_id: string; }) {
    const position = detail.count < 0 ? "Against" : "For";


    return (
        <div className="py-4 border-b flex gap-3 items-center w-full">
            <Avatar>
                <AvatarImage src={detail.avatar_url || ""} alt={detail.full_name || ""} />
                <AvatarFallback>{detail.full_name ? detail.full_name.substring(0, 2) : 'U'}</AvatarFallback>
            </Avatar>
            <div>
                <div className="font-semibold text-sm">{detail.full_name || 'Unknown'}</div>
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                    {Math.abs(detail.count)}
                    {position === "Against" ? <div className="relative size-5"><Image src='/images/arb.svg' alt="ARB" fill /></div> : <div className="relative size-5"><Image src='/images/arb.svg' alt="ARB" fill /></div>}
                    {position} </div>
            </div>
        </div>
    );
}