// app/components/ContactItem.tsx
import clsx from "clsx";

type ContactItemProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function ContactItem({
  icon,
  title,
  children,
  className,
}: ContactItemProps) {
  return (
    <div className={clsx("flex items-start gap-4", className)}>
      <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-b from-[#92A7FF]/40 to-[#5C7BFF]/80 bg-indigo-100 text-indigo-700 grid place-items-center shadow-sm">
        {icon}
      </div>
      <div className="pt-1">
        <p className="text-sm text-gray-500" style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}>{title}</p>
        <div className="mt-1 text-lg text-gray-900 leading-snug" style={{ letterSpacing: '-0.5px', lineHeight: '26px' }}>{children}</div>
      </div>
    </div>
  );
}
