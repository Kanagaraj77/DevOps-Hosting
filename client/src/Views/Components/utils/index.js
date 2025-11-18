export const truncateText = (text, limit) => {
    const strippedText = text.replace(/<[^>]*>/g, "");
    return strippedText.length > limit
      ? `${strippedText.substring(0, limit)}...`
      : text;
  };