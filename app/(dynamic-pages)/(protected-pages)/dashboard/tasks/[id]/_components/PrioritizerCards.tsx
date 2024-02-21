import { FC } from "react";
import { PrioritizerCard } from "./PrioritizerCard";

interface PrioritizerCardsProps {
    prioritizations: {
        full_name: string | null;
        avatar_url: string | null;
        count: number;
        created_at: string;
        user_id: string;
    }[];
}

export const PrioritizerCards: FC<PrioritizerCardsProps> = ({ prioritizations }) => {

    return (
        <div className="flex flex-col">
            {prioritizations.map((detail) => (
                <PrioritizerCard key={detail.user_id} {...detail} />
            ))}
        </div>
    )
}