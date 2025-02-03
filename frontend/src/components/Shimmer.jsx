import ShimmerItem from "./ShimmerItem";

function Shimmer({ itemsLength, classes }) {
  function getShimmerUI() {
    const shimmerUI = [];
    for (let i = 0; i < itemsLength; i++) {
      shimmerUI.push(<ShimmerItem key={i} classes={classes} />);
    }
    return shimmerUI;
  }

  return (
    <div className="px-4 mb-4 mt-6 grid gap-x-2 gap-y-2 max-[550px]:place-items-center grid-cols-[repeat(auto-fit,minmax(1fr,1fr))] min-[550px]:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
      {getShimmerUI()}
    </div>
  );
}

export default Shimmer;
