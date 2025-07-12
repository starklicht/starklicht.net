import React from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [result, setResult] = React.useState("");
  const [resultType, setResultType] = React.useState<string | null>(null);
  const [agreed, setAgreed] = React.useState(false);
  const [discountOptIn, setDiscountOptIn] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!agreed) {
      setResult("You must agree to the privacy policy to continue.");
      setResultType("error");
      return;
    }
    setResult("Sending...");
    setResultType(null);
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "8de41a02-df79-4c67-b321-6b0fccd56f54");
    formData.append("discount_opt_in", discountOptIn ? "yes" : "no");
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    if (data.success) {
      setResult("Thank you! If you opted in, you'll receive a one-time coupon code by email when the shop launches.");
      setResultType("success");
      event.currentTarget.reset();
      setAgreed(false);
      setDiscountOptIn(false);
      setTouched(false);
    } else {
      setResult(data.message || "Something went wrong.");
      setResultType("error");
    }
  };

  return (
    <div className={styles.contactCard}>
      <form className={styles.contactForm} onSubmit={onSubmit} autoComplete="on">
        <label htmlFor="email">Email for your coupon code</label>
        <input type="email" id="email" name="email" placeholder="you@email.com" required />

        <label htmlFor="message">Message (optional)</label>
        <textarea id="message" name="message" placeholder="Want to let us know something? (optional)" rows={4}></textarea>

        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="discountOptIn"
            name="discountOptIn"
            checked={discountOptIn}
            onChange={e => setDiscountOptIn(e.target.checked)}
          />
          <label htmlFor="discountOptIn" className={styles.checkboxLabel}>
            Yes, I want to receive a <b>one-time</b> 10% discount code by email when the shop launches. No newsletters.
          </label>
        </div>

        <div className={styles.checkboxRow}>
          <input
            type="checkbox"
            id="gdpr"
            name="gdpr"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            required
          />
          <label htmlFor="gdpr" className={styles.checkboxLabel}>
            I agree to the <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> and consent to being contacted <b>once</b> by email for my coupon code (if I opted in). No newsletters, no spam.
          </label>
        </div>

        <button type="submit">Get Coupon / Contact</button>
        <div className={styles.privacyNote}>
          Your email will only be used to send your coupon code (if you opt in) or to reply to your message. <b>No newsletters. No bullshit.</b> See our <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> for details.
        </div>
      </form>
      {result && (
        <span className={
          resultType === "success"
            ? `${styles.resultMessage} ${styles.success}`
            : resultType === "error"
            ? `${styles.resultMessage} ${styles.error}`
            : styles.resultMessage
        }>
          {result}
        </span>
      )}
    </div>
  );
}