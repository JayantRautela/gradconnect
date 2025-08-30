import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type  LoginPageCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    iconColor: string;
}

export default function LoginPageCard({ icon: Icon, title, description, iconColor }: LoginPageCardProps) {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-8 text-center">
        <div className={`w-12 h-12 mx-auto mb-6 rounded-xl flex items-center justify-center ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-4 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}