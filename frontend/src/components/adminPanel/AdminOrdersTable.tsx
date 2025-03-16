const AdminTable = () => {
  return (
    <div className="flex flex-col w-full m-0 p-0">
      <div className="w-full bg-base-300 p-4 ">All Orders :</div>
      <div className="overflow-x-auto border border-base-300  bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Payment Id</th>
              <th>Status</th>
              <th>Date</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-base-200 ">
              <th>1</th>
              <td>15156484348994</td>
              <td className={`text-yellow-500 drop-shadow`}>Pending</td>
              <td>2025/1/2</td>
              <td className="text-green-800 drop-shadow-sm">1200$</td>
            </tr>
            <tr className="hover:bg-base-200 ">
              <th>2</th>
              <td>15156484348994</td>
              <td className={`text-green-400 drop-shadow`}>Success</td>
              <td>2025/1/2</td>
              <td className="text-green-800 drop-shadow-sm">1200$</td>
            </tr>
            <tr className="hover:bg-base-200 ">
              <th>3</th>
              <td>15156484348994</td>
              <td className={`text-red-700 drop-shadow`}>Faild</td>
              <td>2025/1/2</td>
              <td className="text-green-800 drop-shadow-sm">1200$</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
