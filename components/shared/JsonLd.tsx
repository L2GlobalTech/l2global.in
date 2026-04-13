
export function OrganizationSchema() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'L2 Global Technologies',
        url: 'https://l2global.in',
        logo: 'https://l2global.in/assets/web/l2-svg.svg',
        description:
            'Enterprise IT integration consultancy delivering Salesforce, SAP, MuleSoft' +
            ' and cloud solutions for UK, USA, Gulf and India businesses.',
        foundingDate: '2020',         // UPDATE with real year
        numberOfEmployees: { '@type': 'QuantitativeValue', value: 45 },
        address: { '@type': 'PostalAddress', addressCountry: 'GB', addressLocality: 'London' },
        contactPoint: [{
            '@type': 'ContactPoint', contactType: 'customer service',
            email: 'contactus@l2global.in',
            availableLanguage: ['English', 'Arabic'],
            areaServed: ['GB', 'US', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'IN'],
        }],
        location: [
            {
                '@type': 'Place', name: 'L2 Global — London',
                address: { '@type': 'PostalAddress', addressLocality: 'London', addressCountry: 'GB' }
            },
            {
                '@type': 'Place', name: 'L2 Global — Dubai',
                address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' }
            },
            {
                '@type': 'Place', name: 'L2 Global — Vijayawada',
                address: { '@type': 'PostalAddress', addressLocality: 'Vijayawada', addressCountry: 'IN' }
            },
        ],
        sameAs: [
            'https://www.linkedin.com/company/l2-global-technologies',
            'https://www.facebook.com/l2globaltechnologies',
            'https://twitter.com/l2globaltech',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog', name: 'IT Consulting Services',
            itemListElement: [
                'Salesforce Consulting', 'SAP Implementation', 'MuleSoft Integration',
                'CRM Consulting', 'API Integration', 'AWS Cloud', 'Oracle Managed Services',
            ].map(name => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service', name,
                    areaServed: ['GB', 'US', 'AE', 'SA', 'QA', 'KW', 'BH', 'OM', 'IN']
                }
            })),
        },
    };
    return <script type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
