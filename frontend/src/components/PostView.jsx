function PostView({ post }) {
  const { title, description, imageSrc, createdAt } = post;

  function giveFormattedDate(dateString) {
    const date = new Date(dateString);
    const months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };

    return `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;
  }

  return (
    <article className="rounded-md shadow-2xl max-w-[400px]">
      <figure>
        <img
          src={imageSrc}
          alt="Post"
          className="w-full h-[450px] rounded-t-md"
        />
      </figure>
      <article className="px-2 pt-2 pb-3">
        <h2 className="text-2xl font-semibold py-1">{title}</h2>
        <article className="mt-3 bg-slate-300 px-2 rounded-md space-y-1 pt-1 pb-2">
          <p className="text-[15px] mt-1 font-semibold">
            {giveFormattedDate(createdAt)}
          </p>
          <p>{description}</p>
        </article>
      </article>
    </article>
  );
}

export default PostView;
