import Link from "next/link";
import Image from "next/image";

export interface PlatformCardProps {
  id: string;
  name: string;
  logo: string;
  description: string;
  href?: string;
}

export function PlatformCard({
  id,
  name,
  logo,
  description,
  href,
}: PlatformCardProps) {
  const cardContent = (
    <>
      <div className="flex items-center justify-center h-16 w-16 mb-4">
        <Image
          src={logo}
          alt={`${name} logo`}
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <h3 className="text-h3 text-text-primary mb-2">{name}</h3>
      <p className="text-body text-text-secondary mb-4">{description}</p>
      <span className="inline-flex items-center text-accent-primary text-sm font-medium mt-auto">
        Learn more
        <svg
          className="ml-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </>
  );

  const baseStyles =
    "flex flex-col p-6 rounded-xl bg-surface border border-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (href) {
    return (
      <Link href={href} className={baseStyles} data-platform-id={id}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={baseStyles} data-platform-id={id}>
      {cardContent}
    </div>
  );
}
