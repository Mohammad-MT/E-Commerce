import { Link } from "react-router-dom";

type path = {
  name: string;
  path: string;
};

interface Prop {
  paths: path[];
}

const Breadcrumbs = ({ paths }: Prop) => {
  return (
    <div className="flex items-center text-pink-600   pt-4 my-2 w-full mb-5">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {paths.map((p, index) => (
            <li key={index}>
              <Link to={p.path}>{p.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
