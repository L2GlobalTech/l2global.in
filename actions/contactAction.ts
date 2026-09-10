'use server';

const SF_ENDPOINT =
  'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D4P0000010dcs';
const RET_URL = 'https://l2global.in/contact-us';

const SERVICE_LABELS: Record<string, string> = {
  agentforce: 'Salesforce Agentforce AI',
  'sap-ai': 'SAP Joule AI Implementation',
  'sap-s4hana': 'SAP S/4HANA / RISE with SAP',
  salesforce: 'Salesforce / CRM Consulting',
  sap: 'SAP Integration & Implementation',
  mulesoft: 'MuleSoft Integration',
  api: 'API Integration Services',
  aws: 'AWS Cloud Services',
  oracle: 'Oracle Managed Services',
  'data-science': 'Data Science & Machine Learning',
  'manufacturing-cloud': 'Agentforce Manufacturing Cloud',
  'financial-services': 'Financial Services Cloud',
  cpq: 'CPQ & Revenue Cloud',
  web: 'Website Design & Development',
  custom: 'Custom IT Solutions',
  other: 'Other / Not Sure',
};

export interface SubmitLeadPayload {
  last_name: string;
  email: string;
  mobile?: string;
  company?: string;
  city?: string;
  description?: string;
  service?: string;
}

export async function submitLead(data: SubmitLeadPayload) {
  const { last_name, email, mobile, company, city, description, service } = data;

  if (!last_name || typeof last_name !== 'string' || !last_name.trim()) {
    return {
      success: false,
      error: 'Name is required',
    };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      error: 'A valid email is required',
    };
  }

  const serviceLabel = (service && SERVICE_LABELS[service]) || service || '';
  const fullDescription = serviceLabel
    ? `Service Interested In: ${serviceLabel}\n\n${description || ''}`
    : description || '';

  const params = new URLSearchParams();
  params.set('oid', '00D4P0000010dcs');
  params.set('retURL', RET_URL);
  params.set('lead_source', 'Website');
  params.set('last_name', last_name.trim());
  params.set('email', email.trim());
  if (mobile) params.set('mobile', mobile.trim());
  if (company) params.set('company', company.trim());
  if (city) params.set('city', city.trim());
  params.set('description', fullDescription);

  try {
    const sfRes = await fetch(SF_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    if (sfRes.ok) {
      return { success: true };
    }

    return {
      success: false,
      error: 'Salesforce returned an unexpected response',
      sfStatus: sfRes.status,
    };
  } catch (err) {
    return {
      success: false,
      error: 'Failed to reach Salesforce',
      detail: String(err),
    };
  }
}
