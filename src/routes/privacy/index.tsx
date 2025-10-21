import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy matters. This policy explains what we collect, why we
            collect it, and how you can control your information when using
            LingualLift.
          </p>
        </div>
      </section>

      {/* Body */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <Section
          title="1) Information We Collect"
          content={
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Account data</span>: name, email,
                password.
              </li>
              <li>
                <span className="font-medium">Profile & learning data</span>:
                level, goals, progress, quiz results.
              </li>
              <li>
                <span className="font-medium">Usage & device data</span>: pages
                viewed, time on page, IP, browser, cookies.
              </li>
              <li>
                <span className="font-medium">Third-party auth</span>{" "}
                (optional): Google OAuth basic profile & email.
              </li>
              <li>
                <span className="font-medium">Support</span>: messages you send
                to our team.
              </li>
            </ul>
          }
        />

        <Section
          title="2) How We Use Your Information"
          content={
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                Provide and personalize learning features and progress tracking.
              </li>
              <li>
                Maintain security, prevent fraud, and troubleshoot issues.
              </li>
              <li>Improve product via analytics and A/B testing.</li>
              <li>
                Communicate updates, tips, or service notices (you can opt out
                of non-essential emails).
              </li>
              <li>Comply with legal obligations.</li>
            </ul>
          }
        />

        <Section
          title="3) Cookies & Similar Technologies"
          content={
            <p className="text-gray-600">
              We use cookies for sign-in, session security, and analytics. You
              can manage cookies in your browser settings. Disabling some
              cookies may affect functionality.
            </p>
          }
        />

        <Section
          title="4) Sharing & Disclosure"
          content={
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Service providers</span>: hosting,
                analytics, email delivery, payment (if any), bound by contracts.
              </li>
              <li>
                <span className="font-medium">Legal requirements</span>: when
                required by law or to protect rights and safety.
              </li>
              <li>
                <span className="font-medium">No selling</span> of your personal
                data.
              </li>
            </ul>
          }
        />

        <Section
          title="5) Data Retention"
          content={
            <p className="text-gray-600">
              We keep data only as long as necessary for the purposes above. You
              may request deletion of your account; we will also retain limited
              records if required by law or for legitimate business interests
              (e.g., fraud prevention).
            </p>
          }
        />

        <Section
          title="6) Your Rights & Controls"
          content={
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Access, correct, or delete your personal data.</li>
              <li>Export your data, where technically feasible.</li>
              <li>
                Object to or restrict certain processing; withdraw marketing
                consent at any time.
              </li>
              <li>
                Contact us to exercise rights (see “Contact Us”). We will verify
                your request.
              </li>
            </ul>
          }
        />

        <Section
          title="7) Children’s Privacy"
          content={
            <p className="text-gray-600">
              LingualLift is not directed to children under 13 (or the age
              required by your jurisdiction). We do not knowingly collect
              personal data from children without verifiable parental consent.
              If you believe a child has provided data, contact us to remove it.
            </p>
          }
        />

        <Section
          title="8) International Transfers"
          content={
            <p className="text-gray-600">
              Your information may be processed in countries with data
              protection laws different from yours. We implement safeguards
              (e.g., contractual clauses) where required.
            </p>
          }
        />

        <Section
          title="9) Security"
          content={
            <p className="text-gray-600">
              We use administrative, technical, and organizational measures to
              protect data (encryption in transit, access controls, backups).
              However, no system can be 100% secure.
            </p>
          }
        />

        <Section
          title="10) Changes to This Policy"
          content={
            <p className="text-gray-600">
              We may update this Policy from time to time. Material changes will
              be posted here with an updated “Last updated” date. Continued use
              of the Service means you accept the changes.
            </p>
          }
        />

        <Section
          title="11) Contact Us"
          content={
            <p className="text-gray-600">
              Questions or requests about privacy? Email us at{" "}
              <a
                href="mailto:support@linguallift.com"
                className="text-blue-600 hover:underline"
              >
                support@linguallift.com
              </a>
              .
            </p>
          }
        />

        <div className="flex items-center justify-between pt-6 border-t border-gray-200 text-sm text-gray-500">
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          <a href="/terms" className="text-blue-600 hover:underline">
            View Terms of Service →
          </a>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition hover:shadow-md">
      <h2 className="text-xl font-semibold text-primary mb-2">{title}</h2>
      <div className="leading-relaxed">{content}</div>
    </section>
  );
}
