function Toaster({ text, textClass }) {
  return (
    <article className="z-50 fixed top-5 right-5 py-3 px-3 rounded-sm bg-slate-200 max-w-[400px]">
      <p className={`${textClass} text-lg font-semibold`}>{text}</p>
    </article>
  );
}

export default Toaster;
