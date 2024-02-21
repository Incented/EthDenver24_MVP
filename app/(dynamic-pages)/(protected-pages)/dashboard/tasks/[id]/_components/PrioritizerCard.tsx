import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carrot } from "lucide-react";

export function PrioritizerCard(detail: { full_name: string | null; avatar_url: string | null; count: number; created_at: string; user_id: string; }) {
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
                    {position === "Against" ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-primary" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.91303 6.56522C4.07521 8.82048 2 14.67 2 14.67C2 14.67 7.83487 12.6001 10.0915 10.769M11.2031 9.20725C11.3631 8.68846 11.3789 8.13591 11.2488 7.60882C11.1188 7.08173 10.8477 6.59998 10.4647 6.2152C10.0817 5.83042 9.60121 5.55712 9.07473 5.4246C8.54825 5.29208 7.99563 5.30533 7.47611 5.46293M6.00105 9.33528L5.00079 8.33502" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14.67 6.00104C14.67 6.00104 13.9098 4.66736 12.6695 4.66736C11.7319 4.66736 10.6689 6.00104 10.6689 6.00104C10.6689 6.00104 11.4291 7.33473 12.6695 7.33473C13.9098 7.33473 14.67 6.00104 14.67 6.00104Z" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 2.66684L14.0032 14.67M10.6689 2C10.6689 2 9.33526 2.7602 9.33526 4.00053C9.33526 5.24085 10.6689 6.00105 10.6689 6.00105C10.6689 6.00105 12.0026 4.94944 12.0026 4.00053C12.0026 2.7602 10.6689 2 10.6689 2Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> : <Carrot size={20} className="stroke-primary" />}
                    {position} </div>
            </div>
        </div>
    );
}