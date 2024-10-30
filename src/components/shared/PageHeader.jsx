const PageHeader = ({ header }) => {
  return (
    <div className="bg-white text-slate-800 text-5xl font-bold p-8 rounded-md shadow-sm pt-10">
      <header>
        <h1>{header}</h1>
      </header>
    </div>
  );
};

export default PageHeader;
