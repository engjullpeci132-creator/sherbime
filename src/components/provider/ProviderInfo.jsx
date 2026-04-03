import { Badge } from '@/components/ui/badge';
import { Briefcase, DollarSign, Phone } from 'lucide-react';

export default function ProviderInfo({ provider }) {
  return (
    <div className="px-5 mt-5 space-y-5">
      {provider.description && (
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2">Rreth ofruesit</h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-body">{provider.description}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-secondary rounded-2xl p-3 text-center">
          <DollarSign className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="font-heading font-bold text-foreground">${provider.hourly_rate}</p>
          <p className="text-[10px] text-muted-foreground">për orë</p>
        </div>
        <div className="bg-secondary rounded-2xl p-3 text-center">
          <Briefcase className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="font-heading font-bold text-foreground">{provider.total_jobs || 0}</p>
          <p className="text-[10px] text-muted-foreground">punë kryer</p>
        </div>
        <div className="bg-secondary rounded-2xl p-3 text-center">
          <Phone className="w-5 h-5 text-primary mx-auto mb-1" />
          <p className="font-heading font-bold text-foreground text-xs">{provider.phone || 'N/A'}</p>
          <p className="text-[10px] text-muted-foreground">kontakt</p>
        </div>
      </div>

      {provider.skills?.length > 0 && (
        <div>
          <h3 className="font-heading font-semibold text-sm text-foreground mb-2">Aftësitë</h3>
          <div className="flex flex-wrap gap-2">
            {provider.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="rounded-full text-xs font-body">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
