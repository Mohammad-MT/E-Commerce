const Page404 = () => {
  return (
    <div className="min-h-[calc(100vh-24.2rem)]">
      <div className="flex flex-col items-center  justify-center max-w-5xl h-full mx-auto ">
        <h1 className="text-6xl font-bold m-4">404</h1>
        <p className="text-xl mb-8">Page Not Found</p>
        <a href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default Page404;
