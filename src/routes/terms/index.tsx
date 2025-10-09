import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please read these Terms carefully before using LingualLift. By
            accessing or using our website, you agree to be bound by these
            terms.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <Section
          title="1. Acceptance of Terms"
          content="By using our Service, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please discontinue use of the Service immediately."
        />
        <Section
          title="2. User Responsibilities"
          content="You agree to use LingualLift for lawful purposes only and not to violate any applicable local, national, or international laws. You are responsible for maintaining the confidentiality of your account and password."
        />
        <Section
          title="3. Intellectual Property"
          content="All materials on this website, including text, graphics, logos, and software, are the property of LingualLift or its content suppliers and are protected by international copyright laws."
        />
        <Section
          title="4. Limitation of Liability"
          content="LingualLift shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including but not limited to data loss or business interruption."
        />
        <Section
          title="5. Termination"
          content="We may suspend or terminate your access to the Service at any time, without notice, if you violate these Terms."
        />
        <Section
          title="6. Changes to Terms"
          content="LingualLift reserves the right to update or modify these Terms at any time. Changes will take effect immediately upon posting to this page."
        />
        <Section
          title="7. Contact Us"
          content={
            <>
              If you have any questions about these Terms, please contact us at:{" "}
              <a
                href="mailto:support@linguallift.com"
                className="text-blue-600 hover:underline"
              >
                support@linguallift.com
              </a>
              .
            </>
          }
        />
        <div className="flex items-center justify-between pt-6 border-t border-gray-200 text-sm text-gray-500">
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          <a href="/terms" className="text-blue-600 hover:underline">
            View Polices of Service →
          </a>
        </div>
      </main>
    </div>
  );
}

// Subcomponent for section cards
function Section({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-primary mb-2">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{content}</p>
    </div>
  );
}
