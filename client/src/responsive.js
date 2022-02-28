import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 415px) {
      ${props}
    }
  `;
};

export const tablet = (props) => {
  return css`
    @media only screen and (min-width: 416px) and (max-width: 768px) {
      ${props}
    }
  `;
};
export const bigtablet = (props) => {
  return css`
    @media only screen and (min-width: 768px) and (max-width: 1200px) {
      ${props}
    }
  `;
};
