import { Link } from "react-router-dom";

interface Prop {
  newDirectory: string;
  newDirectory2?: string;
}

const Breadcrumbs = ({ newDirectory, newDirectory2 }: Prop) => {
  return (
    <div className="flex items-center text-gray-500  pt-4 my-2 w-full mb-5">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>{newDirectory}</li>
          {newDirectory2 && <li>{newDirectory2}</li>}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
