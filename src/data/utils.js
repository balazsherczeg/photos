export const getCategoryIdBySlug = (categorySlug, categories) => {
  return categorySlug
    ? (categories ?? []).find(({ slug }) => slug === categorySlug)?.id
    : null;
};
