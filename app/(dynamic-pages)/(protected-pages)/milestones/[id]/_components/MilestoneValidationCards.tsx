import { FC } from "react";
import { MilestoneValidationCard } from "./MilestoneValidationCard";


interface MilestoneValidationCardsProps {
    validations: {
        full_name: string | null;
        avatar_url: string | null;
        count: number;
        created_at: string;
        user_id: string;
    }[];
}

export const MilestoneValidationCards: FC<MilestoneValidationCardsProps> = async ({ validations }) => {

    return (
        <div className="flex flex-col">
            {validations.map((detail) => (
                <MilestoneValidationCard key={detail.user_id} {...detail} />
            ))}
        </div>
    )
}