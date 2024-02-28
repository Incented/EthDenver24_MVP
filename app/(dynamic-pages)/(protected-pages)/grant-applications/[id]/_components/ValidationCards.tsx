import { FC } from "react";
import { ValidationCard } from "./ValidationCard";

interface ValidationCardsProps {
    validations: {
        full_name: string | null;
        avatar_url: string | null;
        count: number;
        created_at: string;
        user_id: string;
    }[];
}

export const ValidationCards: FC<ValidationCardsProps> = async ({ validations }) => {

    return (
        <div className="flex flex-col">
            {validations.map((detail) => (
                <ValidationCard key={detail.user_id} {...detail} />
            ))}
        </div>
    )
}