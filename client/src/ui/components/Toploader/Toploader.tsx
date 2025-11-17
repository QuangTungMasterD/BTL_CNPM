import NextTopLoader from "nextjs-toploader";


function Toploader() {
  return (
    <NextTopLoader showSpinner={false} height={2} color="#2eafeb" zIndex={1600} />
  );
}

export default Toploader;
