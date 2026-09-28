import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <section className="section bg-bg">
      <div className="container-x">
        <div className="max-w-md mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-success-bg text-success-fg
                          flex items-center justify-center mx-auto mb-6">
            <i className="ri-checkbox-circle-line text-3xl" />
          </div>

          {/* Heading */}
          <h1 className="mb-2">Thank you</h1>
          <p className="text-lg text-text-muted mb-8">
            Your tour has been booked.
          </p>

          {/* CTA */}
          <Link to="/home" className="btn-primary inline-flex">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;