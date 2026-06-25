import { ItemCard } from './ItemCard';

interface CategoryItem {
  id: string;
  name: string;
  amount: number | null;
  confidence: number;
  sourceDocument: string;
  subtitle?: string;
}

interface CategorySectionProps {
  title: string;
  icon: React.ReactNode;
  items: CategoryItem[];
  currency?: string;
}

export function CategorySection({ title, icon, items, currency = 'INR' }: CategorySectionProps) {
  if (items.length === 0) return null;

  return (
    <section data-testid={`category-section-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            name={item.name}
            amount={item.amount}
            confidence={item.confidence}
            sourceDocument={item.sourceDocument}
            subtitle={item.subtitle}
            currency={currency}
          />
        ))}
      </div>
    </section>
  );
}
