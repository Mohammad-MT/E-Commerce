import { Mail, Phone, MapPin } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

const ContactPage = () => {
  return (
    <div className="min-h-[calc(100vh-24.2rem)] flex flex-col items-center justify-center bg-base-100 ">
      <div className="max-w-5xl h-full w-full">
        <Breadcrumbs paths={[{ name: "Contact", path: "/contact" }]} />
        <div className="flex justify-center">
          <div className="bg-base-100 shadow-lg rounded-lg p-8 max-w-lg w-full border border-base-300">
            <h1 className="text-2xl font-bold text-center mb-5">Contact Us</h1>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  placeholder="Your Message"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-neutral w-full">
                Send Message
              </button>
            </form>
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+123 456 7890</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Main Street, Anytown, USA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
