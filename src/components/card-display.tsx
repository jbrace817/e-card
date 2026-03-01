import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Mail, Phone, Globe } from "lucide-react";

type CardDisplayProps = {
  card: {
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    jobTitle?: string;
    website?: string;
    bio?: string;
  };
};

export default function CardDisplay({ card }: CardDisplayProps) {
  const fullName = [card.firstName, card.lastName].filter(Boolean).join(" ");
  const subtitle = [card.jobTitle, card.company].filter(Boolean).join(" at ");

  const hasContactInfo = card.email || card.phone || card.website;

  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardContent className="p-6">
        {/* Header: Name and title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">{fullName}</h2>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Contact info */}
        {hasContactInfo && (
          <>
            <Separator className="my-4" />
            <div className="space-y-3">
              {card.email && (
                <a
                  href={`mailto:${card.email}`}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{card.email}</span>
                </a>
              )}
              {card.phone && (
                <a
                  href={`tel:${card.phone}`}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{card.phone}</span>
                </a>
              )}
              {card.website && (
                <a
                  href={card.website.startsWith("http") ? card.website : `https://${card.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>{card.website}</span>
                </a>
              )}
            </div>
          </>
        )}

        {/* Bio */}
        {card.bio && (
          <>
            <Separator className="my-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.bio}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
