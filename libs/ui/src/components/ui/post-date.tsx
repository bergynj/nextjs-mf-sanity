"use client";
import { useEffect, useState } from "react";

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

function PostDate({ date }: { date: string }) {
  const [postDate, setPostDate] = useState<string>("");

  useEffect(() => {
    if (date) {
      const formattedDate = formatDate(date);
      setPostDate(formattedDate);
    }
  }, [date]);

  return <div>{postDate}</div>;
}

export { PostDate };
export default PostDate;
