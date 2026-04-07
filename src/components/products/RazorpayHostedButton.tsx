import Script from "next/script";

type RazorpayHostedButtonProps = {
  buttonId: string;
};

export default function RazorpayHostedButton({ buttonId }: RazorpayHostedButtonProps) {
  return (
    <form>
      <Script
        src="https://checkout.razorpay.com/v1/payment-button.js"
        data-payment_button_id={buttonId}
        strategy="afterInteractive"
      />
    </form>
  );
}