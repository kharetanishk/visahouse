import { notFound } from "next/navigation";
import { visaDocumentData } from "@/lib/data/visaDocuments";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import VisaChecklist from "@/components/sections/VisaChecklist";
import ContactForm from "@/components/sections/ContactForm";

interface Props {
  params: { countryKey: string };
}

export default function VisaCountryPage({ params }: Props) {
  const { countryKey } = params;
  const country = visaDocumentData[countryKey];
  if (!country) notFound();

  return (
    <main>
      <Header />
      <VisaChecklist country={country} />
      <ContactForm />
      <Footer />
    </main>
  );
}

