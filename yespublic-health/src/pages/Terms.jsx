import { useState } from "react";

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx} className="border-b border-gray-300">
          <p
            onClick={() => toggle(idx)}
            className="w-full flex justify-between items-center py-3 text-left font-medium text-lg cursor-pointer"
          >
            {item.question}
            <span>{openIndex === idx ? "−" : "+"}</span>
          </p>
          {openIndex === idx && (
            <div className="pb-4 text-gray-700 space-y-2">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function Terms() {
  const items = [
    {
      question: "1. Use of Our Website",
      answer: (
        <ul>
          <li>
            Our website provides general health, fitness, and wellness
            information for educational purposes only.
          </li>
          <li>
            You agree to use our website and email services in a lawful and
            respectful manner.
          </li>
          <li>
            You must not misuse the site (e.g., upload harmful content, spam, or
            attempt to disrupt functionality).
          </li>
        </ul>
      ),
    },
    {
      question: "2. Email Subscription",
      answer: (
        <ul>
          <li>
            By subscribing with your email, you agree to receive periodic
            health-related updates, newsletters, and resources from us.
          </li>
          <li>
            You can unsubscribe at any time by clicking the unsubscribe link in
            our emails.
          </li>
          <li>
            We do not send spam, sell, or share your email address with third
            parties for marketing.
          </li>
        </ul>
      ),
    },
    {
      question: "3. No Medical Advice",
      answer: (
        <ul>
          <li>
            The content provided on our website and through our emails is for
            informational purposes only.
          </li>
          <li>
            It should not be considered medical advice, diagnosis, or treatment.
          </li>
          <li>
            Always consult a qualified healthcare provider before making
            health-related decisions.
          </li>
        </ul>
      ),
    },
    {
      question: "4. Privacy",
      answer: (
        <p>
          Your privacy is important to us. Please review our{" "}
          <a href="/policy">Privacy Policy</a> to understand how we collect and
          use your information.
        </p>
      ),
    },
    {
      question: "5. Intellectual Property",
      answer: (
        <ul>
          <li>
            All content (articles, images, graphics, and resources) on this
            website is the property of Yespublic Health and Fitness, unless
            otherwise noted.
          </li>
          <li>
            You may not copy, distribute, or reproduce our content without
            permission.
          </li>
        </ul>
      ),
    },
    {
      question: "6. Limitation of Liability",
      answer: (
        <ul>
          <li>
            We do our best to provide accurate and reliable information, but we
            make no guarantees.
          </li>
          <li>
            Yespublic Health and Fitness is not liable for any direct or
            indirect damages arising from the use of our content or email
            communications.
          </li>
        </ul>
      ),
    },
    {
      question: "7. Third-Party Links",
      answer: (
        <ul>
          <li>Our website or emails may contain links to third-party sites.</li>
          <li>
            We are not responsible for the content, practices, or policies of
            those websites.
          </li>
        </ul>
      ),
    },
    {
      question: "8. Changes to Terms",
      answer: (
        <ul>
          <li>We may update these Terms of Service from time to time.</li>
          <li>
            Continued use of our website or emails means you accept the updated
            terms.
          </li>
        </ul>
      ),
    },
    {
      question: "9. Contact Us",
      answer: (
        <p>
          For questions regarding these Terms, contact us at:{" "}
          <a href="mailto:contact@yespublic.net">contact@yespublic.net</a>
        </p>
      ),
    },
  ];

  return (
    <section className="section">
      <div className="container narrow">
        <h2>Terms of Service – Yespublic Health and Fitness</h2>
        <p className="muted">
          Welcome to Yespublic Health and Fitness. By accessing or using our
          website and subscribing to our email updates, you agree to these Terms
          of Service. Please read them carefully.
        </p>
        <Accordion items={items} />
      </div>
    </section>
  );
}
