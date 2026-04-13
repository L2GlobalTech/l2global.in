"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// const COUNTRIES = [
//   { name: "India", phoneCode: "91", flag: "https://flagcdn.com/in.svg", maxLength: 10 },
//   { name: "United States", phoneCode: "1", flag: "https://flagcdn.com/us.svg", maxLength: 10 },
//   { name: "United Kingdom", phoneCode: "44", flag: "https://flagcdn.com/gb.svg", maxLength: 10 },
//   { name: "Canada", phoneCode: "1", flag: "https://flagcdn.com/ca.svg", maxLength: 10 },
//   { name: "Australia", phoneCode: "61", flag: "https://flagcdn.com/au.svg", maxLength: 9 },
//   { name: "Singapore", phoneCode: "65", flag: "https://flagcdn.com/sg.svg", maxLength: 8 },
//   { name: "Romania", phoneCode: "40", flag: "https://flagcdn.com/ro.svg", maxLength: 9 },
// ];

const COUNTRIES = [
  // Primary markets — top of list
  { name: 'United Kingdom', phoneCode: '44', flag: 'https://flagcdn.com/gb.svg', maxLength: 10 },
  { name: 'United States', phoneCode: '1', flag: 'https://flagcdn.com/us.svg', maxLength: 10 },
  // Gulf countries
  { name: 'UAE (Dubai)', phoneCode: '971', flag: 'https://flagcdn.com/ae.svg', maxLength: 9 },
  { name: 'Saudi Arabia', phoneCode: '966', flag: 'https://flagcdn.com/sa.svg', maxLength: 9 },
  { name: 'Qatar', phoneCode: '974', flag: 'https://flagcdn.com/qa.svg', maxLength: 8 },
  { name: 'Kuwait', phoneCode: '965', flag: 'https://flagcdn.com/kw.svg', maxLength: 8 },
  { name: 'Bahrain', phoneCode: '973', flag: 'https://flagcdn.com/bh.svg', maxLength: 8 },
  { name: 'Oman', phoneCode: '968', flag: 'https://flagcdn.com/om.svg', maxLength: 8 },
  // Other markets
  { name: 'India', phoneCode: '91', flag: 'https://flagcdn.com/in.svg', maxLength: 10 },
  { name: 'Canada', phoneCode: '1', flag: 'https://flagcdn.com/ca.svg', maxLength: 10 },
  { name: 'Australia', phoneCode: '61', flag: 'https://flagcdn.com/au.svg', maxLength: 9 },
];


export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  // const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[3]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    last_name: "",
    email: "",
    mobile: "",
    company: "",
    city: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Timezone detection — set initial country based on user's local timezone
  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      let detected;

      if (tz.includes("London")) detected = COUNTRIES[0];
      else if (tz.includes("Kolkata") || tz.includes("Calcutta")) detected = COUNTRIES[8];
      else if (tz.includes("Dubai")) detected = COUNTRIES[2];
      else if (tz.includes("Riyadh")) detected = COUNTRIES[3];
      else if (tz.includes("Qatar")) detected = COUNTRIES[4];
      else if (tz.includes("Kuwait")) detected = COUNTRIES[5];
      else if (tz.includes("Bahrain")) detected = COUNTRIES[6];
      else if (tz.includes("Muscat")) detected = COUNTRIES[7];
      else if (tz.includes("Australia")) detected = COUNTRIES[10];
      else if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Canada")) detected = COUNTRIES[9];
      else if (tz.includes("America") || tz.includes("US/")) detected = COUNTRIES[1];

      if (detected) {
        setSelectedCountry(detected);
      }
    } catch (e) {
      console.error("Timezone detection failed", e);
    }
  }, []);


  const validate = (values = form) => {
    const errs: Record<string, string> = {};

    if (!values.last_name.trim() || values.last_name.length < 2)
      errs.last_name = "Name must be at least 2 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      errs.email = "Enter a valid email";

    if (!values.mobile || values.mobile.length !== selectedCountry.maxLength)
      errs.mobile = `Phone must be ${selectedCountry.maxLength} digits`;

    if (!values.company.trim() || values.company.length < 2)
      errs.company = "Company name must be at least 2 characters";

    if (
      !values.city.trim() ||
      values.city.length < 2 ||
      !/^[a-zA-Z\s]+$/.test(values.city)
    )
      errs.city = "Enter a valid city name";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "mobile" ? value.replace(/\D/g, "") : value;
    const updated = { ...form, [name]: newValue };
    setForm(updated);
    validate(updated);
  };

  return (
    <>
      <iframe
        ref={iframeRef}
        name="sf_hidden_iframe"
        className="hidden"
        onLoad={() => {
          if (submitted) {
            setSubmitted(false);
            setForm({
              last_name: "",
              email: "",
              mobile: "",
              company: "",
              city: "",
              description: "",
            });

            setTimeout(() => {
              const toast = document.getElementById("sf-toast");
              toast?.classList.remove("opacity-0");
              setTimeout(() => toast?.classList.add("opacity-0"), 4000);
            }, 300);
          }
        }}
      />

      <div className="rounded-3xl bg-[#FCFCFC] p-6 sm:p-8 ring-1 ring-[#F1EDFF] relative">
        <form
          target="sf_hidden_iframe"
          action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D4P0000010dcs"
          method="POST"
          className="space-y-6"
          onSubmit={(e) => {
            if (!validate()) {
              e.preventDefault();
              return;
            }

            setForm((prev) => ({
              ...prev,
              mobile: `${selectedCountry.phoneCode}${prev.mobile}`,
            }));

            setSubmitted(true);
          }}
        >
          <input type="hidden" name="oid" value="00D4P0000010dcs" />
          <input type="hidden" name="retURL" value="" />

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold">Name</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-2 w-full rounded-lg ring-1 ring-[#F1EDFF] bg-white px-4 py-3"
            />
            {errors.last_name && <p className="text-xs text-red-500">{errors.last_name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-lg ring-1 ring-[#F1EDFF] bg-white px-4 py-3"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold">Phone number</label>
            <div className="mt-2 grid grid-cols-3 gap-3">
              <div ref={dropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="w-full rounded-lg ring-1 ring-[#F1EDFF] bg-white px-3 py-3 flex gap-2"
                >
                  <Image src={selectedCountry.flag} alt="" width={20} height={14} />
                  +{selectedCountry.phoneCode}
                </button>

                {open && (
                  <ul className="absolute bg-white z-10 w-full shadow rounded-lg">
                    {COUNTRIES.map((c) => (
                      <li
                        key={c.name}
                        onClick={() => {
                          setSelectedCountry(c);
                          setForm({ ...form, mobile: "" });
                          setOpen(false);
                        }}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        +{c.phoneCode} {c.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                maxLength={selectedCountry.maxLength}
                placeholder="Phone number"
                className="col-span-2 rounded-lg ring-1 ring-[#F1EDFF] bg-white px-4 py-3"
              />
            </div>
            {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-semibold">Company</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enter company name"
              className="mt-2 w-full rounded-lg ring-1 ring-[#F1EDFF] bg-white px-4 py-3"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold">City</label>
            <input
              name="city"
              placeholder="Enter city name"
              value={form.city}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg ring-1 ring-[#F1EDFF] bg-white px-4 py-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              placeholder="Tell us about your project"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg mt-2 ring-1 ring-[#F1EDFF] bg-white px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-full cursor-pointer px-5 py-3 text-white font-semibold shadow-md transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(to bottom, #4684FF, #074FDA)" }}
          >
            Get Started
          </button>
        </form>

        {/* Toast */}
        <div
          id="sf-toast"
          className="opacity-0 pointer-events-none transition-opacity fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg"
        >
          ✅ Thank you! We’ll contact you shortly.
        </div>
      </div>
    </>
  );
}
