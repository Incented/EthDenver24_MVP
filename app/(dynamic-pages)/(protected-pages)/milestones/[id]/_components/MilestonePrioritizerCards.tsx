import { FC } from "react";
import { MilestonePrioritizerCard } from "./MilesontPrioritizerCard";

interface MilestonePrioritizerCardsProps {
    prioritizations: {
        full_name: string | null;
        avatar_url: string | null;
        count: number;
        created_at: string;
        user_id: string;
    }[];
}

export const MilestonePrioritizerCards: FC<MilestonePrioritizerCardsProps> = async ({ prioritizations }) => {

    return (
        <div className="flex flex-col">
            {prioritizations.map((detail) => (
                <MilestonePrioritizerCard key={detail.user_id} {...detail} />
            ))}
        </div>
    )
}