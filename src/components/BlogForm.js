const BlogForm = ({
  handleBlogCreation,
  handleBlogData,
  title,
  author,
  url,
}) => {
  return (
    <>
      <h4>create new blog</h4>
      <form onSubmit={handleBlogCreation}>
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={handleBlogData}
        />
        <br />
        <label htmlFor="author">author</label>
        <input
          id="author"
          type="text"
          name="author"
          value={author}
          onChange={handleBlogData}
        />
        <br />
        <label htmlFor="url">url</label>
        <input
          id="url"
          type="text"
          name="url"
          value={url}
          onChange={handleBlogData}
        />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
