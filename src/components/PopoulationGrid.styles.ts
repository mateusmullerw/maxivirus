import styled from "styled-components";

type Props = {
  height: string
}
export const GridContainer = styled.div<Props>`
    width: 100%;
    height: ${(props)=> props.height};
    max-width: 1450px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;