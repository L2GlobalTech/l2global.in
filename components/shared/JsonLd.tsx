// Add to components/shared/JsonLd.tsx — new export:
interface ServiceSchemaProps {
    serviceName: string; serviceUrl: string; description: string;
    cities: string[];
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'L2 Global Technologies',
    url: 'https://l2global.in',
    logo: 'https://l2global.in/assets/web/l2-svg.svg',
    email: 'contactus@l2global.in',
    telephone: '+44-7442-586325',
    foundingDate: '2014',
    description: 'Expert Salesforce, SAP, MuleSoft and cloud integration consultants serving USA, UK, Canada, Australia, Asia and Gulf businesses.',
    address: [
      { '@type': 'PostalAddress', addressCountry: 'GB', streetAddress: 'Cheltenham Road, Gloucester', postalCode: 'GL2 0JR', addressRegion: 'England', name: 'L2 Global Technologies Ltd — UK Headquarters' },
      { '@type': 'PostalAddress', addressCountry: 'US', addressRegion: 'TX', addressLocality: 'Texas', name: 'L2 Global Technologies — Texas USA Office' },
      { '@type': 'PostalAddress', addressCountry: 'IN', addressLocality: 'Vijayawada', addressRegion: 'Andhra Pradesh', postalCode: '521286', streetAddress: 'Tempalli, Gannavaram, Krishna District', name: 'L2 Global Technologies — India Delivery Centre' },
      { '@type': 'PostalAddress', addressCountry: 'AE', addressLocality: 'Dubai', name: 'L2 Global Technologies — Dubai Office' },
    ],
    areaServed: ['GB','US','AE','SA','QA','KW','BH','OM','IN'].map(c => ({
      '@type': 'Country', name: c
    })),
    sameAs: ['https://www.linkedin.com/company/l2-global-technologies'],
  };
  return <script type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}



export function ServiceLocalSchema({ serviceName, serviceUrl, description, cities }: ServiceSchemaProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': ['ProfessionalService', 'LocalBusiness'],
        name: `L2 Global Technologies — ${serviceName}`,
        url: serviceUrl,
        image: 'https://l2global.in/assets/web/l2-svg.svg',
        description,
        email: 'contactus@l2global.in',
        priceRange: '££–££££',
        currenciesAccepted: 'GBP, USD, AED, SAR',
        openingHours: 'Mo-Fr 09:00-18:00',
        areaServed: [
            ...['GB', 'US', 'CA', 'AU', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'IN', 'SG'].map(c => (
                { '@type': 'Country', name: c }
            )),
            { '@type': 'Place', name: 'Asia' },
        ],
        serviceArea: cities.map(city => ({ '@type': 'City', name: city })),
        hasOfferCatalog: {
            '@type': 'OfferCatalog', name: serviceName,
            itemListElement: [{
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: serviceName, description }
            }],
        },
    };
    return <script type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
