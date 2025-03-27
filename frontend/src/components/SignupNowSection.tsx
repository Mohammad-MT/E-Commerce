import { Link } from "react-router-dom";

const SignupNowSection = () => {
  return (
    <div className="signup-section bg-base-200 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Sign Up Now</h2>
        <p className="text-gray-600 mb-6">
          Join us today and enjoy exclusive benefits and offers!
        </p>
        <Link to={"/signup"}>
          <button className="btn  text-white px-5 bg-pink-600 hover:bg-pink-500">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignupNowSection;
