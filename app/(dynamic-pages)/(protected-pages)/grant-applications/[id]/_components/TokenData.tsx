import { Carrot } from "lucide-react";
import Image from "next/image";

export function TokenData({
    token
}: {
    token?: string;
}) {
    return (
        <div className="flex gap-2 rounded-full p-2.5 px-4 border items-center">
            <label className="sr-only">Carrots</label>
            {token === 'ARB' ? <div className="relative size-5"><Image src='/images/arb.svg' alt="ARB" fill /></div> : <Carrot size={16} className="font-medium text-foreground" />}
            {/* <Carrot size={16} className="font-medium text-foreground" /> */}

            <span className="text-foreground sm:text-sm" id="carrots-amount">
                {token ? token : "Carrots"}
            </span>
        </div>
    )
}