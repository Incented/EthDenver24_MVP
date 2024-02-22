import { Carrot } from "lucide-react";

export function TokenData() {
    return (
        <div className="flex gap-2 rounded-full p-2.5 px-4 border items-center">
            <label className="sr-only">Carrots</label>
            <Carrot size={16} className="font-medium text-foreground" />

            <span className="text-foreground sm:text-sm" id="carrots-amount">
                Carrots
            </span>
        </div>
    )
}