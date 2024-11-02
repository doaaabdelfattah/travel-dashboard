const PrimaryHeader = ({ children }) => {
  return (
    <>
      <div className="bg-white text-slate-800 text-5xl font-bold p-8 rounded-md shadow-sm pt-10">
        <h1>{children}</h1>
      </div>
    </>
  );
};

export default PrimaryHeader;
