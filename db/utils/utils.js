exports.formatDates = list => {
  if (list === undefined) return [];
  return list.map(article => {
    const newArticle = { ...article };
    newArticle.created_at = new Date(newArticle.created_at);
    return newArticle;
  });
};

exports.makeRefObj = list => {
  if (list === undefined) return [];
  const refObj = {};
  list.forEach(obj => {
    return (refObj[obj.title] = obj.article_id);
  });
  return refObj;
};

exports.formatComments = (comments, articleRef) => {
  if (comments) return [];
};
