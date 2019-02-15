import { css } from "@emotion/core";

import { rhythm } from "../utils/typography";

interface Tag {
  tag: string;
  extra?: string;
}

const Tags = ({ tags }: { tags: Tag[] }) => {
  if (tags.length > 0) {
    return (
      <ul
        css={{
          listStyle: "none",
          margin: `${rhythm(1)} 0 ${rhythm(3 / 4)}`,
          padding: 0,
        }}
      >
        {tags.map(({ tag, extra }: Tag) => (
          <li
            css={css`
              display: inline;

              &:not(:last-child)::after {
                content: ", ";
                display: inline;
              }
            `}
          >
            <a href={`/tag/${tag}`}>#{tag}</a>
            {extra ? extra : null}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default Tags;
