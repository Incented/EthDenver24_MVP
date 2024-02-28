'use client'



export function ContributionDescription({
    description
}: {
    description: string;
}) {
    return (
        <div className="text-foreground text-sm underline underline-offset-4">{description}</div>
    )
}