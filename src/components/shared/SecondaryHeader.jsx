const SecondaryHeader = ({ children }) => {
  return (
    <h2 className="text-2xl font-semibold py-3 flex gap-2 items-center">
      {children}
    </h2>
  );
};

export default SecondaryHeader;
